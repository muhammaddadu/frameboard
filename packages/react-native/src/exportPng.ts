export async function exportElementAsPng(element: HTMLElement, filename: string): Promise<void> {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const rect = element.getBoundingClientRect();
  const htmlToImage = await import('html-to-image').catch(() => null);

  if (htmlToImage?.toPng) {
    const dataUrl = await htmlToImage.toPng(element, {
      backgroundColor: '#F7F4EE',
      cacheBust: true,
      height: rect.height,
      pixelRatio: 2,
      width: rect.width,
    });
    downloadDataUrl(dataUrl, filename);
    return;
  }

  window.alert?.('Screenshot export requires html-to-image in the host app.');
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
