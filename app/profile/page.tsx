import { fetchUserByEmailHelper } from "@/lib/user/helpers";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/services/prisma";
import ProfileScreenForSelf from "@/components/profile/screens/profileScreenForSelf";
import { UserExtended } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  const profileUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      favoriteBooks: true,
      favoriteMovies: true,
    },
  });

  if (!profileUser) {
    redirect("/profile/create");
  }

  return <ProfileScreenForSelf user={profileUser as UserExtended} />;
}
