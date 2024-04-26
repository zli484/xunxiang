import prisma from "@/lib/services/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { profilePictureFileName } from "@/lib/images";
// import { serverAuth } from '@/lib/auth/auth'
import { put, del } from "@vercel/blob";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: NextRequest) {
  console.log("POST /api/user/update/picture");
  //   const user = await serverAuth(request)
  //   if (!user) {
  //     return new Response('Not authenticated', { status: 401 })
  //   }

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userEmail = session?.user.email;

  const formData = await request.formData();
  const picture = formData.get("profilePicture") as File;
  const userId = formData.get("userId") as string;

  if (!picture) {
    return new Response("Missing profile picture", { status: 400 });
  }

  // Upload the picture to Vercel Blob storage
  const oldFileName = formData.get("profilePictureURL") as string;
  const fileName = profilePictureFileName(userId);
  const blob = await put(fileName, picture, {
    access: "public",
  });
  console.log("profile picture upload successful! blob", blob);

  // Update the user's picture URL in the database
  const updatedUser = await prisma.user.update({
    where: { email: userEmail },
    data: {
      profilePictureURL: blob.url,
    },
  });

  // Delete the old picture from Vercel Blob storage
  if (
    oldFileName &&
    oldFileName.startsWith(
      "https://ytvuzh5vvdsoeyx2.public.blob.vercel-storage.com/"
    )
  ) {
    await del(oldFileName);
    console.log("deleted old profile picture", oldFileName);
  }

  return NextResponse.json(updatedUser);
}
