import { copyFile, cp, mkdir, rm } from 'node:fs/promises';

const siteDist = 'pages-dist';

await rm(siteDist, { force: true, recursive: true });
await mkdir(`${siteDist}/examples/react`, { recursive: true });

await cp('examples/react-app/dist', siteDist, { recursive: true });
await copyFile(`${siteDist}/index.html`, `${siteDist}/examples/react/index.html`);
