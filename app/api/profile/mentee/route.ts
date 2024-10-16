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
    const menteeProfile = await prisma.menteeProfile.upsert({
      where: {
        userId: user.id,
      },
      update: {
        bio: data.bio,
        careerGoals: data.careerGoals,
        currentChallenges: data.currentChallenges,
        mentorPreferences: data.mentorPreferences,
        availability: data.availability,
      },
      create: {
        userId: user.id,
        bio: data.bio,
        careerGoals: data.careerGoals,
        currentChallenges: data.currentChallenges,
        mentorPreferences: data.mentorPreferences,
        availability: data.availability,
      },
    });

    return NextResponse.json({ success: true, data: menteeProfile });
  } catch (error) {
    console.error("Error creating mentee profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create mentee profile" },
      { status: 500 }
    );
  }
}
