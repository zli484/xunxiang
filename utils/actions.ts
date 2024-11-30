"use server";

import { imageSchema, UserSchema, validateWithZodSchema } from "./schemas";

import { redirect } from "next/navigation";
import prisma from "@/lib/services/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabaseClient";
import { createClient } from "./supabase/server";
import { getEmbedding } from "@/lib/apiUtils";
import { currentUser } from "@clerk/nextjs/server";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

export const getProfileUser = async () => {
  //   const user = await currentUser();

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
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    //@ts-ignore
    const validatedFields = validateWithZodSchema(UserSchema, rawData);

    console.log("validated fields", validatedFields);

    await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        ...validatedFields,
      },
    });

    let bio = formData.get("bio") as string;
  } catch (error) {
    return renderError(error);
  }
  redirect("/member");
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await currentUser();

  if (!user) {
    return { message: "Please login to update your profile" };
  }

  try {
    const rawData = Object.fromEntries(formData);
    const books = JSON.parse(rawData.favoriteBooks as string);
    const movies = JSON.parse(rawData.favoriteMovies as string);

    // Handle books
    await Promise.all(
      books.map(async (book: any) => {
        await prisma.book.upsert({
          where: { id: book.id },
          update: {
            title: book.title,
            authors: book.authors,
            coverUrl: book.coverUrl,
            publishedYear: book.publishedYear,
          },
          create: {
            id: book.id,
            title: book.title,
            authors: book.authors,
            coverUrl: book.coverUrl,
            publishedYear: book.publishedYear,
          },
        });
      })
    );

    // Handle movies
    await Promise.all(
      movies.map(async (movie: any) => {
        await prisma.movie.upsert({
          where: { id: movie.id },
          update: {
            title: movie.title,
            directors: movie.directors,
            coverUrl: movie.coverUrl,
            releaseYear: movie.releaseYear,
          },
          create: {
            id: movie.id,
            title: movie.title,
            directors: movie.directors,
            coverUrl: movie.coverUrl,
            releaseYear: movie.releaseYear,
          },
        });
      })
    );

    // Update user profile
    //@ts-ignore
    const validatedFields = validateWithZodSchema(UserSchema, {
      ...rawData,
      favoriteBooks: undefined,
      favoriteMovies: undefined,
    });

    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        ...validatedFields,
        favoriteBooks: {
          set: books.map((book: any) => ({ id: book.id })),
        },
        favoriteMovies: {
          set: movies.map((movie: any) => ({ id: movie.id })),
        },
      },
    });

    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
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
    const fullPath = await uploadImage({
      bucketName: "user-profile-pics",
      image: validatedFields.image,
    });

    await prisma.user.update({
      where: {
        clerkId: user.id,
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
  saveReceiverUserId: string;
}) => {
  const user = await getProfileUser();

  if (!user) {
    return null;
  }

  const favorite = await prisma.userSave.findFirst({
    where: {
      saveReceiverUserId: saveReceiverUserId,
      saveInitiatorUserId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  saveReceiverUserId: string;
  userSaveId: string | null;
  pathname: string;
}) => {
  const user = await getProfileUser();

  if (!user) {
    return { message: "Please login to save a profile" };
  }

  const { saveReceiverUserId, userSaveId, pathname } = prevState;
  try {
    if (userSaveId) {
      await prisma.userSave.delete({
        where: {
          id: parseInt(userSaveId),
        },
      });
    } else {
      await prisma.userSave.create({
        data: {
          saveReceiverUserId: saveReceiverUserId,
          saveInitiatorUserId: user.id,
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
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const profilePictureURL = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profilePictureURL: true,
    },
  });

  console.log("profilePictureURL", profilePictureURL);
  return profilePictureURL?.profilePictureURL;
};
