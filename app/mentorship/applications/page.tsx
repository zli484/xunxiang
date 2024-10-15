import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ApplicationWithProfiles } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";
import { redirect } from "next/navigation";
import MentorApplications from "@/components/profile/sections/MentorApplications";

export default async function MentorshipApplicationsPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-up");
  }

  const currUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  const mentorProfile = await prisma.mentorProfile.findUnique({
    where: {
      userId: currUser?.id,
    },
  });

  if (!mentorProfile) {
    redirect("/profile");
  }

  const applications = await prisma.application.findMany({
    where: {
      mentorProfileId: mentorProfile.id,
    },
    include: {
      menteeProfile: {
        include: {
          user: true,
        },
      },
      mentorProfile: {
        include: {
          user: true,
        },
      },
    },
  });

  console.log("applications are ", applications);

  return <MentorApplications applications={applications} />;
}
