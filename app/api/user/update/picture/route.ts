// import prisma from "@/lib/services/prisma";
// import { NextResponse, type NextRequest } from "next/server";
// import { profilePictureFileName } from "@/lib/images";
// // import { serverAuth } from '@/lib/auth/auth'
// import { put, del } from "@vercel/blob";
// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// export async function POST(request: NextRequest) {
//   console.log("POST /api/user/update/picture");
//   //   const user = await serverAuth(request)
//   //   if (!user) {
//   //     return new Response('Not authenticated', { status: 401 })
//   //   }

//   const cookieStore = cookies();
//   const supabase = createServerComponentClient({ cookies: () => cookieStore });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   const userEmail = session?.user.email;

//   const formData = await request.formData();
//   const picture = formData.get("profilePicture") as File;
//   const userId = formData.get("userId") as string;

//   if (!picture) {
//     return new Response("Missing profile picture", { status: 400 });
//   }

//   // Upload the picture to Vercel Blob storage
//   const oldFileName = formData.get("profilePictureURL") as string;
//   const fileName = profilePictureFileName(userId);
//   const blob = await put(fileName, picture, {
//     access: "public",
//   });
//   console.log("profile picture upload successful! blob", blob);

//   // Update the user's picture URL in the database
//   const updatedUser = await prisma.user.update({
//     where: { email: userEmail },
//     data: {
//       profilePictureURL: blob.url,
//     },
//   });import prisma from "@/lib/services/prisma";

// import { NextResponse, type NextRequest } from "next/server";
// import { profilePictureFileName } from "@/lib/images";
// import { Storage } from "@google-cloud/storage";
// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import prisma from "@/lib/services/prisma";

// // Initialize Google Cloud Storage
// const storage = new Storage({
//   credentials: JSON.parse(
//     process.env.GOOGLE_SERVICE_ACCOUNT_IMAGE_UPLOAD || "null"
//   ),
// });

// const bucketName = process.env.GS_BUCKET_XUNXIANG_USERS_PROFILES;
// const bucket = storage.bucket(bucketName || "");

// export async function POST(request: NextRequest) {
//   const cookieStore = cookies();
//   const supabase = createServerComponentClient({ cookies: () => cookieStore });
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   const userEmail = session?.user.email;

//   const formData = await request.formData();
//   const picture = formData.get("profilePicture") as File;
//   const userId = formData.get("userId") as string;

//   if (!picture) {
//     return new Response("Missing profile picture", { status: 400 });
//   }

//   const fileName = profilePictureFileName(userId);
//   const buffer = await blobToBuffer(picture);
//   await uploadBuffer(buffer, fileName);

//   // try {
//   //   console.log("debugging 1");
//   //   await new Promise((resolve, reject) => {
//   //     stream.on("error", (err) => {
//   //       console.error(err);
//   //       reject(
//   //         new Response("Failed to upload profile picture", { status: 500 })
//   //       );
//   //     });

//   //     console.log("debugging 2");
//   //     stream.on("finish", async () => {
//   //       console.log("debugging 3");
//   //       await file.makePublic();
//   //       const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
//   //       const updatedUser = await prisma.user.update({
//   //         where: { email: userEmail },
//   //         data: { profilePictureURL: publicUrl },
//   //       });

//   //       const oldFileName = formData.get("profilePictureURL") as string;
//   //       if (oldFileName) {
//   //         const oldFile = bucket.file(
//   //           oldFileName.replace(
//   //             `https://storage.googleapis.com/${bucketName}/`,
//   //             ""
//   //           )
//   //         );
//   //         await oldFile.delete();
//   //       }

//   //       resolve(NextResponse.json(updatedUser));
//   //     });
//   //   });
//   // } catch (error) {
//   //   return error; // Ensure you return a response even in case of errors.
//   // }
// }

// // Given a blob, convert it to a buffer.
// async function blobToBuffer(blob: Blob): Promise<Buffer> {
//   const arrayBuffer = await blob.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);
//   return buffer;
// }

// // Given a buffer and filename, upload the contents to Google Storage.
// export async function uploadBuffer(buffer: Buffer, filename: string) {
//   console.log("uploading buffer to file", filename);
//   if (!process.env.GS_BUCKET_XUNXIANG_USERS_PROFILES) {
//     throw new Error("GCLOUD_STORAGE_BUCKET is not defined.");
//   }
//   const targetFile = bucket.file(filename);
//   const stream = targetFile.createWriteStream({
//     resumable: false,
//     contentType: "image/jpeg",
//   });
//   // Check that the stream did not error.
//   const res = stream.on("error", (err) => {
//     return err;
//   });
//   // If the stream produced an error, return it.
//   if (res instanceof Error) {
//     console.error("Error:", res);
//     return res;
//   }

//   // Check that the stream is finished.
//   stream.on("finish", () => {
//     console.log(`Buffer upload complete.`);
//   });
//   stream.end(buffer);

//   // Return the final file.
//   return targetFile;
// }

import { NextResponse, type NextRequest } from "next/server";
import { profilePictureFileName } from "@/lib/images";
import { Storage } from "@google-cloud/storage";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/services/prisma";

// Initialize Google Cloud Storage
const storage = new Storage({
  credentials: JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_IMAGE_UPLOAD || "null"
  ),
});

const bucketName = process.env.GS_BUCKET_XUNXIANG_USERS_PROFILES;
const bucket = storage.bucket(bucketName || "");

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userEmail = session?.user.email;

  const formData = await request.formData();
  const picture = formData.get("profilePicture") as File;
  const userId = formData.get("userId") as string;
  const userFirstName = formData.get("firstName") as string;

  if (!picture) {
    return new Response("Missing profile picture", { status: 400 });
  }

  const fileName = profilePictureFileName(userId, userFirstName);
  const buffer = await blobToBuffer(picture);

  try {
    const file = await uploadBuffer(buffer, fileName);

    console.log("debugging 1");
    // await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: { profilePictureURL: publicUrl },
    });

    const oldFileName = formData.get("profilePictureURL") as string;
    if (oldFileName) {
      const oldFile = bucket.file(
        oldFileName.replace(`https://storage.googleapis.com/${bucketName}/`, "")
      );
      await oldFile.delete();
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Upload error:", error);
    return new Response("Failed to upload profile picture", { status: 500 });
  }
}

// Given a blob, convert it to a buffer.
async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}

// Given a buffer and filename, upload the contents to Google Storage.
async function uploadBuffer(buffer: Buffer, filename: string) {
  console.log("Uploading buffer to file", filename);
  if (!process.env.GS_BUCKET_XUNXIANG_USERS_PROFILES) {
    throw new Error("GCLOUD_STORAGE_BUCKET is not defined.");
  }
  const file = bucket.file(filename);
  const stream = file.createWriteStream({
    resumable: false,
    contentType: "image/jpeg",
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => {
      console.error("Stream error:", err);
      reject(new Response("Failed to upload profile picture", { status: 500 }));
    });

    stream.on("finish", () => {
      console.log(`Buffer upload complete for ${filename}.`);
      resolve(file);
    });

    stream.end(buffer);
  });
}
