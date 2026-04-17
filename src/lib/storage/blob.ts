import { put, del } from "@vercel/blob";

export async function uploadCardImage(
  userId: string,
  imageBase64: string,
): Promise<string> {
  const buffer = Buffer.from(imageBase64, "base64");
  const key = `cards/${userId}/${crypto.randomUUID()}.png`;
  const { url } = await put(key, buffer, {
    access: "public",
    contentType: "image/png",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return url;
}

export async function deleteCardImage(url: string): Promise<void> {
  await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
}
