// import { getSession } from "@/lib/supabaseSession";
import prisma from "@/lib/services/prisma";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUserByEmailHelper } from "@/lib/user/helpers";
import ProfileScreen from "@/components/profile/screens/profileScreen";

export default async function ProfileOtherUsersPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("params is", params);

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: session } = await supabase.auth.getSession();

  const loggedInUser = await fetchUserByEmailHelper(
    session.session?.user.email as string
  );
  if (!loggedInUser) {
    notFound();
  }

  // const user = await fetchUserByIdHelper(Number(params.id));

  // Retrieve user and chat
  const user = await prisma.user.findUnique({
    where: {
      userId: Number(params.id),
    },
  });

  if (!user) {
    notFound();
  }

  // If there exists a chat between loggedInUser and user, then use that chat

  return <ProfileScreen isSelf={false} user={user} />;
}
