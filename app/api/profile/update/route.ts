import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const updateData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      bio: formData.get("bio") as string,
      currentCity: formData.get("currentCity") as string,
      linkedInLink: formData.get("linkedInLink") as string,
      graduationYear: parseInt(formData.get("graduationYear") as string),
      school: formData.get("school") as string,
      currentRole: formData.get("currentRole") as string,
      currentCompany: formData.get("currentCompany") as string,
    };

    const updatedUser = await prisma.user.update({
      where: {
        email: clerkUser.emailAddresses[0].emailAddress,
      },
      data: updateData,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
