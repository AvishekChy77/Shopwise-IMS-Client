/**
 * Image handling without a third-party host.
 *
 * The app previously uploaded images to ImgBB, which now rejects requests
 * ("You have been forbidden to use this website") and serves 503 placeholders
 * for old links. Instead we downscale the picture in the browser and store it
 * as a compact data URL alongside the record itself.
 */
export const fileToCompressedDataUrl = (file, { maxDimension = 480, quality = 0.72 } = {}) =>
  new Promise((resolve, reject) => {
    if (!file || !file.type?.startsWith("image/")) {
      reject(new Error("Please choose an image file"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not decode the image"));
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
