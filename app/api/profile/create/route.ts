import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    console.log("json data received is", data);

    // const user = await prisma.user.findUnique({
    //   where: { clerkId: clerkUser.id },
    // });

    // if (!user) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    const updatedUser = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        linkedInLink: data.linkedInLink,
        graduationYear: parseInt(data.graduationYear),
        school: data.school,
        currentRole: data.currentRole,
        currentCompany: data.currentCompany,
      },
    });

    await clerkClient.users.updateUserMetadata(clerkUser.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // Update Clerk user metadata
    await fetch(`https://api.clerk.dev/v1/users/${clerkUser.id}/metadata`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privateMetadata: {
          hasProfile: true,
        },
      }),
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}
