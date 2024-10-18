import EditProfileScreen from "@/components/profile/screens/EditProfileScreen";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";

export default async function EditProfilePage() {
  const clerkUser = await currentUser();

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser?.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  console.log("user", user);

  return <EditProfileScreen user={user} />;
}
