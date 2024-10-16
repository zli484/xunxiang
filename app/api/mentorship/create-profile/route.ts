import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bio, yearsOfExperience, menteeExpectations, maxMentees } =
      await req.json();

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const mentorProfile = await prisma.mentorProfile.create({
      data: {
        userId: user.id,
        bio,
        yearsOfExperience: parseInt(yearsOfExperience),
        menteeExpectations,
        maxMentees: parseInt(maxMentees),
      },
    });

    // Update user to be a mentor
    await prisma.user.update({
      where: { id: user.id },
      data: { isMentor: true },
    });

    return NextResponse.json(
      { message: "Mentor profile created successfully", mentorProfile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating mentor profile:", error);
    return NextResponse.json(
      { error: "Failed to create mentor profile" },
      { status: 500 }
    );
  }
}
