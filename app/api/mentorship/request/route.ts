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

    const { mentorUserId, message } = await req.json();

    const loggedInUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: { menteeProfile: true },
    });

    if (!loggedInUser || !loggedInUser.menteeProfile) {
      return NextResponse.json(
        { error: "User or mentee profile not found" },
        { status: 404 }
      );
    }
    const mentorUser = await prisma.user.findUnique({
      where: { id: mentorUserId },
      include: { mentorProfile: true },
    });

    if (!mentorUser || !mentorUser.mentorProfile) {
      return NextResponse.json(
        { error: "Mentor user or mentor profile not found" },
        { status: 404 }
      );
    }

    const application = await prisma.application.create({
      data: {
        menteeProfileId: loggedInUser.menteeProfile.id,
        mentorProfileId: mentorUser.mentorProfile.id,
        status: "PENDING",
        message,
      },
    });

    return NextResponse.json(
      { message: "Mentorship application sent successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating mentorship application:", error);
    return NextResponse.json(
      { error: "Failed to create mentorship application" },
      { status: 500 }
    );
  }
}
