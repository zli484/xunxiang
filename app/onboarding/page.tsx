import Onboarding from "@/components/onboarding/screens/onboarding-screen";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function OnboardingPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: session } = await supabase.auth.getSession();

  if (!session?.session?.user) {
    redirect(`/sign-in?next=/user`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.session.user.email,
    },
  });
  if (!user) {
    notFound(); // should never happen
  }

  return <Onboarding user={user} />;
}
