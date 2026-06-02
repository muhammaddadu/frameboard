export async function exportElementAsPng(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('PNG export is only available in a browser runtime.');
  }

  const rect = element.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);

  if (width <= 0 || height <= 0) {
    throw new Error('Cannot export an empty artboard.');
  }

  const clone = element.cloneNode(true) as HTMLElement;
  inlineComputedStyles(element, clone);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `<foreignObject width="100%" height="100%">${serialized}</foreignObject>`,
    '</svg>',
  ].join('');

  const image = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  const canvas = document.createElement('canvas');
  const scale = Math.max(2, window.devicePixelRatio || 1);
  canvas.width = width * scale;
  canvas.height = height * scale;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas export is unavailable in this browser.');
  }

  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.drawImage(image, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((nextBlob) => {
      if (nextBlob) resolve(nextBlob);
      else reject(new Error('Could not create PNG data.'));
    }, 'image/png');
  });

  downloadBlob(blob, filename);
}

function inlineComputedStyles(source: Element, clone: Element) {
  if (source instanceof HTMLElement && clone instanceof HTMLElement) {
    const computedStyle = window.getComputedStyle(source);
    for (let index = 0; index < computedStyle.length; index += 1) {
      const propertyName = computedStyle.item(index);
      clone.style.setProperty(
        propertyName,
        computedStyle.getPropertyValue(propertyName),
        computedStyle.getPropertyPriority(propertyName),
      );
    }
  }

  Array.from(source.children).forEach((sourceChild, index) => {
    const cloneChild = clone.children.item(index);
    if (cloneChild) inlineComputedStyles(sourceChild, cloneChild);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not render artboard image.'));
    image.src = src;
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
