"use server";

import { imageSchema, UserSchema, validateWithZodSchema } from "./schemas";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "./db";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/services/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabaseClient";
import { createClient } from "./supabase/server";

export const getAuthUser = async () => {
  //   const user = await currentUser();

  console.log("getting auth user");

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return null;
  }

  return data.user;
};

export const getProfileUser = async () => {
  //   const user = await currentUser();

  console.log("getting auth user");

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return null;
  }

  const profileUser = await prisma.user.findUnique({
    where: {
      email: data.user.email,
    },
  });

  return profileUser;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

export const signInAction = async (prevState: any, formData: FormData) => {
  //   const cookieStore = cookies();
  //   const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("data", data);

    if (error) {
      console.log("error", error);
    }

    return { message: "Signed in Successfully" };
  } catch (error) {
    return renderError(error);
  } finally {
    redirect("/user");
    // router.refresh();
  }
};

export const signUpAction = async (prevState: any, formData: FormData) => {
  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    return renderError(error);
  } finally {
    redirect("/user");
  }
  // router.refresh();
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
        email: user.email,
        ...validatedFields,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/member");
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  console.log("raw data is", formData);

  if (!user) {
    return { message: "Please login to update your profile" };
  }

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(UserSchema, rawData);

    await db.user.update({
      where: {
        email: user.email,
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

  if (!user) {
    return { message: "Please login to update your profile image" };
  }

  try {
    const image = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.user.update({
      where: {
        email: user.email,
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
  const user = await getProfileUser();

  if (!user) {
    return null;
  }

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
  const user = await getProfileUser();

  if (!user) {
    return { message: "Please login to save a profile" };
  }

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

export const fetchProfileImage = async () => {
  const user = await getAuthUser();
  if (!user) {
    return null;
  }

  const profilePictureURL = await db.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      profilePictureURL: true,
    },
  });
  return profilePictureURL?.profilePictureURL;
};