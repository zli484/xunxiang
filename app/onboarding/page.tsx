import Onboarding from "@/components/onboarding/screens/onboarding-screen";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import CreateProfilePage from "../profile/create/page";
import { getProfileUser } from "@/utils/actions";

export default async function OnboardingPage() {
  // const supabase = createClient();
  // const { data: session } = await supabase.auth.getSession();

  // if (!session?.session?.user) {
  //   redirect(`/login?next=/user`);
  // }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: session.session.user.email,
  //   },
  // });
  // if (!user) {
  //   redirect(`/onboarding`);
  // }

  const user = await getProfileUser();
  // if (!user) {
  //   return notFound();
  // }

  return <CreateProfilePage />;

  // return <Onboarding user={user} />;
}
