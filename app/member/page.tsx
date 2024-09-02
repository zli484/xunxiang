import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
import UserScreen from "@/components/screens/user-screen";
import prisma from "@/lib/services/prisma";
import AllUserScreen from "@/components/user/screens/all-users-screen";
import { currentUser } from "@clerk/nextjs/server";

export default async function MembersPage() {
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // console.log("session from user page", session);

  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  const currUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  const allUsers = await prisma.user.findMany({
    orderBy: {
      profilePictureURL: {
        sort: "asc", // Users with null or empty URL will be at the bottom
        nulls: "last", // Explicitly place null values last if using PostgreSQL
      },
    },
  });

  // Get the userIds of all the users that the currently logged in user has saved
  const userSaves = await prisma.userSave.findMany({
    where: {
      saveInitiatorUser: {
        userId: currUser?.userId,
      },
    },
    select: {
      saveReceiverUserId: true,
    },
  });

  const savedUserIds = userSaves.map((userSave) => userSave.saveReceiverUserId);

  return (
    <AllUserScreen
      totalUserCount={allUsers.length}
      allUsers={allUsers}
      savedUsersIDs={savedUserIds}
    />
  );
}
