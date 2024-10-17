// import { getSession } from "@/lib/supabaseSession";
import { fetchUserByEmailHelper } from "@/lib/user/helpers";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/services/prisma";
import ProfileScreenForSelf from "@/components/profile/screens/profileScreenForSelf";
import { UserWithProfiles } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const clerkUser = await currentUser();

  const clerkId = clerkUser?.id;

  if (!clerkId) {
    throw new Error("User not found");
  }

  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      mentorProfile: true,
      menteeProfile: true,
    },
  });

  const userWithProfiles = await prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      mentorProfile: true,
      menteeProfile: true,
    },
  });

  if (!userWithProfiles) {
    throw new Error("User not found");
  }

  return (
    <ProfileScreenForSelf
      user={userWithProfiles as UserWithProfiles}
      currentUser={loggedInUser as UserWithProfiles}
    />
  );

  // return <Profile user={user} isProfileOwner={true} />;
}
