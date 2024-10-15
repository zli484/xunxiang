import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Find all users who are mentors but don't have a mentor profile
    const mentorsWithoutProfiles = await prisma.user.findMany({
      where: {
        isMentor: true,
        mentorProfile: null,
      },
    });

    // Create mentor profiles for these users
    const createdProfiles = await Promise.all(
      mentorsWithoutProfiles.map((user) =>
        prisma.mentorProfile.create({
          data: {
            userId: user.id,
            bio: user.bio,
          },
        })
      )
    );

    return NextResponse.json(
      { message: `Created ${createdProfiles.length} mentor profiles` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating mentor profiles:", error);
    return NextResponse.json(
      { message: "Error creating mentor profiles" },
      { status: 500 }
    );
  }
}
