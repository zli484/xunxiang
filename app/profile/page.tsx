// import { getSession } from "@/lib/supabaseSession";
import ProfileSelfScreen from "@/components/profile/screens/profile-self-screen";
import { fetchUserByEmailHelper } from "@/lib/user/helpers";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/services/prisma";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: session } = await supabase.auth.getSession();

  const user = await fetchUserByEmailHelper(
    session.session?.user.email as string
  );

  if (!user) {
    throw new Error("User not found");
  }

  const userInfoPoints = await prisma.userInfoPoint.findMany({
    where: {
      userId: user.userId,
    },
  });
  return <ProfileSelfScreen user={user} userInfoPoints={userInfoPoints} />;

  // return <Profile user={user} isProfileOwner={true} />;
}
