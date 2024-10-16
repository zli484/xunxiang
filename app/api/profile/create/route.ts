import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { uploadImage } from "@/utils/supabaseClient";

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const profileImage = formData.get("profileImage") as File | null;

    let profilePictureURL = null;
    if (profileImage) {
      profilePictureURL = await uploadImage({
        bucketName: "user-profile-pics",
        image: profileImage,
      });
    }

    const updatedUser = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        bio: formData.get("bio") as string,
        linkedInLink: formData.get("linkedInLink") as string,
        graduationYear: parseInt(formData.get("graduationYear") as string),
        school: formData.get("school") as string,
        currentRole: formData.get("currentRole") as string,
        currentCompany: formData.get("currentCompany") as string,
        profilePictureURL: profilePictureURL || null,
      },
    });
    await clerkClient.users.updateUserMetadata(clerkUser.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // Update Clerk user metadata

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}
