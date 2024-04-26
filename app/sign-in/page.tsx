import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
import SignInScreen from "@/components/auth/screens/sign-in-screen";

export default async function SignIn() {
  return <SignInScreen />;
}
