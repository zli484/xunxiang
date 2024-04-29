import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
import UserScreen from "@/components/screens/user-screen";
import prisma from "@/lib/services/prisma";
import AllUserScreen from "@/components/user/screens/all-users-screen";

export default async function MembersPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("session from user page", session);

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
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

  // if (!session) {
  //   redirect("/sign-in");
  // }

  return (
    <AllUserScreen
      totalUserCount={allUsers.length}
      allUsers={allUsers}
      savedUsersIDs={savedUserIds}
    />
  );
}
