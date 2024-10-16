import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// import { createClient } from "@supabase/supabase-js";

const supabase = createClient();

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
  const { data } = await supabase.storage
    .from(bucketName)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("Image upload failed");
  return supabase.storage.from(bucketName).getPublicUrl(newName).data.publicUrl;
};
