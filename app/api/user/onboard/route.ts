import prisma from "@/lib/services/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getEmbedding } from "@/lib/apiUtils";

export async function POST(request: NextRequest) {
  console.log("POST /api/user/onboard");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return new Response("Not authenticated", { status: 401 });
  }

  // console.log("request json", await request.json());

  const {
    firstName,
    gender,
    bio,
    currentCity,
    professionalTags,
    personalTags,
  } = await request.json();

  // Update the user with the new profile picture, resume, and bot summary

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  console.log("debugging 1111");
  console.log("user", user);

  const updatedUser = await prisma.user.update({
    where: { userId: user?.userId },
    data: {
      firstName,
      gender,
      currentCity,
      bio,
      professionalTags,
      personalTags,
      isOnboarded: true,
      joinedDate: new Date(),
    },
  });

  let bioEmbedding;
  if (bio !== undefined) {
    bioEmbedding = await getEmbedding(bio);
  }

  const { error } = await supabase
    .from("users")
    .update({
      bioEmbedding: bioEmbedding,
    })
    .eq("email", session.user.email);

  console.log("error", error);

  console.log("bioEmbedding", bioEmbedding);

  return NextResponse.json(updatedUser);
}
