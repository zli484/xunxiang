import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";
import { uploadImage } from "@/utils/supabaseClient";

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: clerkUser.emailAddresses[0].emailAddress,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();

    // Handle images upload
    const images = formData.getAll("images") as File[];
    const imageUrls = await Promise.all(
      images.map(async (image, index) => {
        const url = await uploadImage({
          bucketName: "activity-images",
          image,
        });
        return {
          url,
          isCover: index === 0, // First image is the cover
        };
      })
    );

    // Parse form data
    const activityData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      categoryId: formData.get("categoryId") as string,
      startDate: formData.get("startDate")
        ? new Date(formData.get("startDate") as string)
        : null,
      endDate: formData.get("endDate")
        ? new Date(formData.get("endDate") as string)
        : null,
      location: (formData.get("location") as string) || null,
      cost: formData.get("cost")
        ? parseFloat(formData.get("cost") as string)
        : null,
      currency: (formData.get("currency") as string) || "USD",
      maxParticipants: formData.get("maxParticipants")
        ? parseInt(formData.get("maxParticipants") as string)
        : null,
      genderPreference: formData.get("genderPreference") as
        | "ANY"
        | "MALE_ONLY"
        | "FEMALE_ONLY",
      skillLevel: formData.get("skillLevel") as
        | "BEGINNER"
        | "INTERMEDIATE"
        | "ADVANCED"
        | "EXPERT"
        | "ANY",
      additionalRequirements:
        (formData.get("additionalRequirements") as string) || null,
    };

    // Create activity with photos
    const activity = await prisma.activity.create({
      data: {
        ...activityData,
        createdByUserId: user.id,
        photos: {
          create: imageUrls,
        },
      },
      include: {
        category: true,
        photos: true,
        createdByUser: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, activity });
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 }
    );
  }
}
