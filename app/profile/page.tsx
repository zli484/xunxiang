// import { getSession } from "@/lib/supabaseSession";
import { fetchUserByEmailHelper } from "@/lib/user/helpers";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/services/prisma";
import ProfileScreen from "@/components/profile/screens/profileScreen";
import { UserWithProfiles } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();

  const clerkId = user?.id;

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
    <ProfileScreen isSelf={true} user={userWithProfiles as UserWithProfiles} />
  );

  // return <Profile user={user} isProfileOwner={true} />;
}
