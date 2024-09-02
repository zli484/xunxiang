import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
import UserScreen from "@/components/screens/user-screen";
import prisma from "@/lib/services/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function User() {
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // console.log("session from user page", session);

  // if (!session) {
  //   redirect("/login");
  // }

  const currUser = await currentUser();

  const user = await prisma.user.findUnique({
    where: {
      email: currUser?.emailAddresses[0].emailAddress,
    },
  });

  const newUsers = await prisma.user.findMany({
    where: {
      NOT: {
        userId: user?.userId,
      },
    },
    orderBy: {
      joinedDate: "desc",
    },
    take: 3,
  });

  const allUsers = await prisma.user.findMany();

  // Get the userIds of all the users that the currently logged in user has saved
  const userSaves = await prisma.userSave.findMany({
    where: {
      saveInitiatorUser: {
        userId: user?.userId,
      },
    },
    select: {
      saveReceiverUserId: true,
    },
  });

  const savedUserIds = userSaves.map((userSave) => userSave.saveReceiverUserId);

  return (
    <UserScreen
      totalUserCount={allUsers.length}
      newUsers={newUsers}
      savedUsersIDs={savedUserIds}
    />
  );
}
