export async function convertImage(file: File, targetType: string, quality = 0.92) {
  const image = new Image();
  const dataUrl = URL.createObjectURL(file);

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = dataUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas context unavailable");
  context.drawImage(image, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, targetType, quality));
  if (!blob) throw new Error("Failed to convert image");
  const ext = targetType.split("/")[1] ?? "img";
  return new File([blob], `converted.${ext}`, { type: targetType });
}
