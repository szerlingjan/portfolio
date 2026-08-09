export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  filename: string;
  imageData: ImageMetadata;
}

export async function loadGalleryImages(
  glob: Record<string, () => Promise<{ default: ImageMetadata }>>,
): Promise<GalleryImage[]> {
  const entries = await Promise.all(
    Object.entries(glob).map(async ([path, loader]) => {
      const { default: imageData } = await loader();
      return {
        path,
        src: imageData.src,
        width: imageData.width,
        height: imageData.height,
        filename: path.split("/").pop() ?? "image.jpg",
        imageData,
      };
    }),
  );

  return entries.sort((a, b) => a.filename.localeCompare(b.filename));
}
