"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/services/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const data = await req.json();

  try {
    const mentorProfile = await prisma.mentorProfile.upsert({
      where: {
        userId: user.id,
      },
      update: {
        bio: data.bio,
        yearsOfExperience: parseInt(data.yearsOfExperience),
        pastExperience: data.pastExperience,
        menteeExpectations: data.menteeExpectations,
        menteeQualifications: data.menteeQualifications
          .split(",")
          .map((q: string) => q.trim()),
        maxMentees: parseInt(data.maxMentees),
        availability: data.availability,
      },
      create: {
        userId: user.id,
        bio: data.bio,
        yearsOfExperience: parseInt(data.yearsOfExperience),
        pastExperience: data.pastExperience,
        menteeExpectations: data.menteeExpectations,
        menteeQualifications: data.menteeQualifications
          .split(",")
          .map((q: string) => q.trim()),
        maxMentees: parseInt(data.maxMentees),
        availability: data.availability,
      },
    });

    return NextResponse.json({ success: true, data: mentorProfile });
  } catch (error) {
    console.error("Error creating mentor profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create mentor profile" },
      { status: 500 }
    );
  }
}
