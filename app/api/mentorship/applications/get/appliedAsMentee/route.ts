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
      menteeProfile: true,
      mentorProfile: true,
    },
  });

  if (!user || !user.menteeProfile) {
    return NextResponse.json(
      { error: "User not found or does not have a mentee profile" },
      { status: 404 }
    );
  }

  try {
    const applications = await prisma.application.findMany({
      where: {
        menteeProfileId: user.menteeProfile.id,
      },
      include: {
        mentorProfile: {
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

    const formattedApplications = applications.map((app) => ({
      id: app.id,
      mentorName: `${app.mentorProfile.user.firstName} ${app.mentorProfile.user.lastName}`,
      status: app.status,
      appliedAt: app.appliedAt.toISOString(),
    }));

    return NextResponse.json(formattedApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
