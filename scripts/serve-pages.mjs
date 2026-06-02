import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import process from 'node:process';
import { URL } from 'node:url';

const port = Number(process.env.PORT ?? 4174);
const basePath = process.env.FRAMEBOARD_BASE_PATH ?? '/frameboard/';
const root = 'pages-dist';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function sendFile(response, path) {
  response.writeHead(200, {
    'Content-Type': contentTypes[extname(path)] ?? 'application/octet-stream',
  });
  createReadStream(path).pipe(response);
}

async function resolveFile(urlPath) {
  if (!urlPath.startsWith(basePath)) return undefined;

  const relative = decodeURIComponent(urlPath.slice(basePath.length));
  const normalized = normalize(relative).replace(/^(\.\.[/\\])+/, '');
  const candidate = join(root, normalized);
  const file = existsSync(candidate) && (await stat(candidate)).isDirectory()
    ? join(candidate, 'index.html')
    : candidate;

  if (existsSync(file)) return file;

  return join(root, 'index.html');
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://localhost:${port}`);
    if (url.pathname === '/') {
      response.writeHead(302, { Location: basePath });
      response.end();
      return;
    }

    const file = await resolveFile(url.pathname);
    if (!file) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    sendFile(response, file);
  } catch (error) {
    response.writeHead(500);
    response.end(error instanceof Error ? error.message : 'Server error');
  }
});

server.on('error', (error) => {
  if (error && typeof error === 'object' && 'code' in error && error.code === 'EADDRINUSE') {
    process.stderr.write(`Port ${port} is already in use. Stop the existing preview server or run with PORT=<port>.\n`);
    process.exit(1);
  }

  throw error;
});

server.listen(port, () => {
  process.stdout.write(`FrameBoard Pages preview: http://localhost:${port}${basePath}\n`);
  process.stdout.write(`FrameBoard example:       http://localhost:${port}${basePath}examples/react/\n`);
});
