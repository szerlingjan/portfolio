import JSZip from "jszip";

export interface GalleryDownloadImage {
  src: string;
  filename: string;
}

const CONCURRENCY = 5;

async function fetchWithLimit(
  images: GalleryDownloadImage[],
  limit: number,
): Promise<{ filename: string; blob: Blob }[]> {
  const results: { filename: string; blob: Blob }[] = [];
  let index = 0;

  async function worker() {
    while (index < images.length) {
      const current = index++;
      const image = images[current];
      const response = await fetch(image.src);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${image.filename}`);
      }
      const blob = await response.blob();
      results[current] = { filename: image.filename, blob };
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, images.length) }, worker),
  );
  return results;
}

export async function downloadGallery(
  galleryName: string,
  images: GalleryDownloadImage[],
  onProgress?: (message: string) => void,
): Promise<void> {
  if (images.length === 0) {
    throw new Error("No images to download");
  }

  onProgress?.("Preparing download…");

  const fetched = await fetchWithLimit(images, CONCURRENCY);

  onProgress?.("Creating archive…");

  const zip = new JSZip();
  for (const { filename, blob } of fetched) {
    zip.file(filename, blob);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${galleryName}.zip`;
  link.click();
  URL.revokeObjectURL(url);
}
