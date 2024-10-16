import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUserByEmailHelper } from "@/lib/user/helpers";
import EditProfileScreen from "@/components/profile/screens/EditProfileScreen";

export default async function EditProfilePage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: session } = await supabase.auth.getSession();

  const user = await fetchUserByEmailHelper(
    session.session?.user.email as string
  );

  if (!user) {
    throw new Error("User not found");
  }

  return <EditProfileScreen user={user} />;
}
