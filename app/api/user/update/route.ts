import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getEmbedding } from "@/lib/apiUtils";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("POST /api/user/update");
  console.log("session from user update post route is", session);

  const userEmail = session?.user.email;

  const data = await request.json();
  console.log("update user with data", data);

  // Each of these fields are optional
  const {
    name,
    firstName,
    lastName,
    bio,
    linkedInLink,
    gender,
    currentCity,
    professionalTags,
    personalTags,
    graduationYear, // Added
    school, // Added
    currentRole, // Assuming this maps to 'role' in your model
    currentCompany, // Assuming this maps to 'company' in your model
  } = data;

  let bioEmbedding;
  if (bio !== undefined) {
    bioEmbedding = await getEmbedding(bio);
  }

  const { error } = await supabase
    .from("users")
    .update({
      bioEmbedding: bioEmbedding,
    })
    .eq("email", userEmail);

  console.log("error", error);

  console.log("bioEmbedding", bioEmbedding);

  // Update user excluding interest fields
  const updatedUser = await prisma.user.update({
    where: { email: userEmail },
    data: {
      firstName,
      lastName,
      bio,
      linkedInLink,
      gender,
      currentCity,
      professionalTags,
      personalTags,
      graduationYear: Number(graduationYear),
      school,
      currentRole,
      currentCompany,
    },
  });

  return NextResponse.json(updatedUser);
}
