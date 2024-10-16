import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUserByEmailHelper } from "@/lib/user/helpers";
import EditProfileScreen from "@/components/profile/screens/EditProfileScreen";
import { currentUser } from "@clerk/nextjs/server";

export default async function EditProfilePage() {
  const clerkUser = await currentUser();

  const user = await fetchUserByEmailHelper(
    clerkUser?.emailAddresses[0].emailAddress as string
  );

  if (!user) {
    throw new Error("User not found");
  }

  return <EditProfileScreen user={user} />;
}
