import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// import { createClient } from "@supabase/supabase-js";

const bucket = "xunxiang-pics";

// const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient();

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("Image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
