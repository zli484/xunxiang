import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(url, key);

export const uploadImage = async ({
  bucketName,
  image,
}: {
  bucketName: string;
  image: File;
}) => {
  console.log("Uploading image to bucket:", bucketName);
  console.log("Image:", image);

  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error(error.message);
  return supabase.storage.from(bucketName).getPublicUrl(newName).data.publicUrl;
};
