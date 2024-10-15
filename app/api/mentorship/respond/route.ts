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

    const { applicationId, status } = await req.json();

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: "Application ID and status are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: { mentorProfile: true },
    });

    if (!user || !user.mentorProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { mentorProfile: true },
    });

    if (
      !application ||
      application.mentorProfile.id !== user.mentorProfile.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status, responseAt: new Date() },
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}
