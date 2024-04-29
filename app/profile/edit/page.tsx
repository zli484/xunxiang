import EditProfile from "@/components/profile/screens/edit-profile-screen";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUserByEmailHelper } from "@/lib/user/helpers";

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

  return <EditProfile user={user} />;
}
