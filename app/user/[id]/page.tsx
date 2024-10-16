// import { getSession } from "@/lib/supabaseSession";
import prisma from "@/lib/services/prisma";
import { notFound } from "next/navigation";
import { fetchUserByEmailHelper } from "@/lib/user/helpers";
import ProfileScreenForSelf from "@/components/profile/screens/profileScreenForSelf.tsx";
import ProfileScreenForOthers from "@/components/profile/screens/profileScreenForOthers";
import { currentUser } from "@clerk/nextjs/server";
import { UserWithProfiles } from "@/lib/types";
export default async function ProfileOtherUsersPage({
  params,
}: {
  params: { id: string };
}) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    notFound();
  }

  // const user = await fetchUserByIdHelper(Number(params.id));

  // Retrieve user and chat
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      mentorProfile: true,
    },
  });

  if (!user) {
    notFound();
  }

  // If there exists a chat between loggedInUser and user, then use that chat

  return <ProfileScreenForOthers user={user as UserWithProfiles} />;
}
