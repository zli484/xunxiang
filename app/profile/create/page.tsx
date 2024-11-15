import React from "react";
import ProfileForm from "@/components/onboarding/profileForm";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";

export default async function ProfileCreatePage() {
  const clerkUser = await currentUser();

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser?.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return <ProfileForm user={user} />;
}
