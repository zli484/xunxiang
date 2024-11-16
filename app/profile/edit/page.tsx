import EditProfileScreen from "@/components/profile/screens/EditProfileScreen";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/services/prisma";
import { UserExtended } from "@/lib/types";

export default async function EditProfilePage() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const profileUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      favoriteBooks: true,
    },
  });

  if (!profileUser) {
    throw new Error("User not found");
  }

  return <EditProfileScreen user={profileUser as UserExtended} />;
}
