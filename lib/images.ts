import { type User } from "@prisma/client";

export const LANDING_PAGE = "/";
export const DEFAULT_PAGE = "/user";

// Google recommends image sizes of around 100 kb for profile pictures.
// However, this results in poor quality images. 250kb is a good balance.
const DEFAULT_MAX_IMAGE_SIZE = 250;
// Since we store our files as compressed JPEG images, we need to multiply the
// max image size by the compression coefficient.
const COMPRESSION_COEFFICIENT = 3;
// The default JPEG quality is 0.92, but we can reduce it to 0.9 to save space.
const DEFAULT_JPEG_QUALITY = 0.9;

// Given an image blob and the area to crop, return a cropped image blob.
export async function cropImage(
  image: Blob,
  areaPixels: { x: number; y: number; width: number; height: number },
  maxSizeKB?: number
): Promise<Blob> {
  const bitmap = await createImageBitmap(image);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not create canvas context.");
  }

  // Set canvas dimensions
  canvas.width = areaPixels.width;
  canvas.height = areaPixels.height;

  // Draw the image
  ctx.drawImage(
    bitmap,
    areaPixels.x,
    areaPixels.y,
    areaPixels.width,
    areaPixels.height,
    0,
    0,
    areaPixels.width,
    areaPixels.height
  );

  let outputBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob from cropped image."));
        }
      },
      "image/jpeg",
      DEFAULT_JPEG_QUALITY
    );
  });

  // Check if resizing needed
  let outputSizeKB = outputBlob.size / 1024;

  if (!maxSizeKB) {
    // The Vercel maximum payload size is 4.5MB, but 250kb is enough for high quality images.
    maxSizeKB = DEFAULT_MAX_IMAGE_SIZE;
  }

  const maxSizeAdjusted = maxSizeKB * COMPRESSION_COEFFICIENT;

  if (outputSizeKB <= maxSizeAdjusted) {
    console.log(
      `Image size: ${outputSizeKB} <= ${maxSizeAdjusted} KB, no resize needed.`
    );
    return outputBlob;
  }

  const scalingFactor = Math.sqrt(maxSizeAdjusted / outputSizeKB);
  canvas.width *= scalingFactor;
  canvas.height *= scalingFactor;

  console.log(`Image too big! Resizing by factor of ${scalingFactor}...`);
  console.log(`Resizing image to ${canvas.width} x ${canvas.height} pixels`);

  // Draw the image again with new dimensions
  ctx.drawImage(
    bitmap,
    areaPixels.x,
    areaPixels.y,
    areaPixels.width,
    areaPixels.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  outputBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create resized blob."));
        }
      },
      "image/jpeg",
      DEFAULT_JPEG_QUALITY
    );
  });

  return outputBlob;
}

// Given a user, return a recommended path to the user's new profile picture.
export function profilePictureFileName(userId: string): string {
  const now = new Date().toISOString(); // Expected output: "2023-01-01T12:34:56.000Z"
  const cleanTime = now.split(".")[0].replace(/:/g, "-");
  return `profile-${userId}-${cleanTime}.jpg`;
}
