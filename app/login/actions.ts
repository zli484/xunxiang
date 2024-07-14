"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { getProfileUser } from "@/utils/actions";

export async function emailLogin(prevState: any, formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  const profileUser = await getProfileUser();

  if (!profileUser) {
    redirect("/profile/create");
  }

  revalidatePath("/", "layout");
  redirect("/");

  return { message: "Signed in successfully" };
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  console.log("error", error);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login/waiting");

  return { message: "Signed up successfully" };
}

export async function signOut() {
  console.log("signing out");

  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
