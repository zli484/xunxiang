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

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(UserSchema, rawData);

    console.log("validated fields", validatedFields);

    await db.user.create({
      data: {
        ...validatedFields,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
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

export const fetchFavoriteId = async ({
  saveReceiverUserId,
}: {
  saveReceiverUserId: number;
}) => {
  const user = await getAuthUser();
  const favorite = await db.userSave.findFirst({
    where: {
      saveReceiverUserId: saveReceiverUserId,
      saveInitiatorUserId: user.userId,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  saveReceiverUserId: number;
  userSaveId: number | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { saveReceiverUserId, userSaveId, pathname } = prevState;
  try {
    if (userSaveId) {
      await db.userSave.delete({
        where: {
          id: userSaveId,
        },
      });
    } else {
      await db.userSave.create({
        data: {
          saveReceiverUserId: saveReceiverUserId,
          saveInitiatorUserId: user.userId,
        },
      });
    }
    revalidatePath(pathname);
    return { message: userSaveId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return renderError(error);
  }
};
