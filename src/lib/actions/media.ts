import "server-only";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";

const MAX_DIMENSION = 1600;

export async function uploadMedia(file: File, alt: string, uploadedById: number) {
  const arrayBuffer = await file.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  let data: Buffer;
  let width: number | undefined;
  let height: number | undefined;
  let mimeType = file.type || "application/octet-stream";

  try {
    const { data: outData, info } = await sharp(inputBuffer)
      .rotate()
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    data = outData;
    width = info.width;
    height = info.height;
    mimeType = "image/webp";
  } catch {
    // sharp gagal (format tak didukung / dsb) — simpan file asli apa adanya.
    data = inputBuffer;
  }

  const media = await prisma.media.create({
    data: {
      filename: file.name,
      mimeType,
      size: data.byteLength,
      width,
      height,
      alt,
      data: new Uint8Array(data),
      uploadedById,
    },
  });

  return media.id;
}

export async function deleteMediaIfUnused(mediaId: number | null | undefined) {
  if (!mediaId) return;
  const [katalogCount, pengurusCount] = await Promise.all([
    prisma.katalogItem.count({ where: { imageMediaId: mediaId } }),
    prisma.pengurus.count({ where: { fotoMediaId: mediaId } }),
  ]);
  if (katalogCount === 0 && pengurusCount === 0) {
    await prisma.media.delete({ where: { id: mediaId } }).catch(() => {});
  }
}
