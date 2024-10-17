import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";

export async function GET() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
    include: {
      mentorProfile: true,
    },
  });

  if (!user || !user.mentorProfile) {
    return NextResponse.json(
      { error: "User not found or does not have a mentor profile" },
      { status: 404 }
    );
  }

  try {
    const applications = await prisma.application.findMany({
      where: {
        mentorProfileId: user.mentorProfile.id,
      },
      include: {
        menteeProfile: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
