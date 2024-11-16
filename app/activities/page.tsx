import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/services/prisma";
import ActivityMatchingScreen from "@/components/activities/ActivityMatchingScreen";
import { ActivityCategory } from "@prisma/client";

export default async function ActivitiesPage() {
  const user = await currentUser();
  console.log("user", user);

  if (!user) {
    redirect("/sign-up");
  }

  const currUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  console.log("currUser", currUser);

  if (!currUser) {
    redirect("/sign-up");
  }

  // Fetch published activities with their related data
  const activities = await prisma.activity.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
    },
    include: {
      createdByUser: true,
      category: true,
      photos: true,
      participants: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch unique categories for filters
  const categories = await prisma.activityCategory.findMany({
    select: {
      name: true,
    },
  });

  return (
    <ActivityMatchingScreen
      activities={activities}
      categories={categories.map((c: ActivityCategory) => c.name)}
      currentUserId={currUser.id}
    />
  );
}
