"use server";

import { imageSchema, UserSchema, validateWithZodSchema } from "./schemas";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "./db";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/services/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";

const getAuthUser = async () => {
  //   const user = await currentUser();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("session from user page", session);

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  //   if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  console.log("raw data is", formData);

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(UserSchema, rawData);

    await db.user.update({
      where: {
        userId: user.userId,
      },
      data: validatedFields,
    });

    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        profilePictureURL: fullPath,
      },
    });
    revalidatePath("/profile");
    return { message: "Profile image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};
