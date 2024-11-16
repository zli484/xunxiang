import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ActivityMatchingScreen from "@/components/activities/ActivityMatchingScreen";

export default async function ActivitiesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  return <ActivityMatchingScreen />;
}
