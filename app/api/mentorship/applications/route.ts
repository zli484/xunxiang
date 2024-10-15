import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      console.log("debugging 1 - applications");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const mentorProfileId = searchParams.get("mentorProfileId");

    console.log("Received mentorProfileId:", mentorProfileId);

    if (!mentorProfileId) {
      return NextResponse.json(
        { error: "Mentor ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: { mentorProfile: true },
    });

    // if (
    //   !user ||
    //   !user.mentorProfile ||
    //   user.mentorProfile.id !== mentorProfileId
    // ) {
    //   console.log("debugging 2 - applications");
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    console.log("debugging 3 - applications");
    console.log("mentorProfileId:", mentorProfileId);

    const applications = await prisma.application.findMany({
      where: { mentorProfileId: mentorProfileId },
      include: {
        menteeProfile: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { appliedAt: "desc" },
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
