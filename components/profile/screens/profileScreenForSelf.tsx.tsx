import { type User } from "@prisma/client";
import BasicInfoCard from "../sections/profileInfoDisplay";
import AskQuestionButton from "../../modals/askQuestionButton";
import ConnectButton from "../sections/connectButton";
import QuestionsSection from "../sections/questionsSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BioCard from "../atoms/bioCard";
import EditProfileButton from "../atoms/editProfileButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MentorshipCard from "../sections/mentorshipCard";
import { UserWithProfiles } from "@/lib/types";

export default function ProfileScreenForSelf({
  user,
}: {
  user: UserWithProfiles;
}) {
  return (
    <>
      <div className="h-screen">
        <Tabs defaultValue="basicInfo" className="flex flex-col">
          <div className="flex items-center">
            <TabsList className="m-12">
              <TabsTrigger value="basicInfo">Info</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              {user.isMentor && (
                <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
              )}
            </TabsList>
          </div>
          <div>
            <TabsContent value="basicInfo">
              <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
                <BasicInfoCard isSelf={true} user={user} />
                <BioCard isSelf={true} user={user} />
              </div>
            </TabsContent>
            <TabsContent value="questions">
              <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
                {/* <QuestionsSection userId={user.id} /> */}
              </div>
            </TabsContent>
            <div className="w-full">
              {user.isMentor && (
                <TabsContent value="mentorship">
                  <div className="">
                    <MentorshipCard user={user} />
                  </div>
                </TabsContent>
              )}
            </div>
          </div>
        </Tabs>
        {/* <div className="flex flex-col w-full bg-white">
          {isSelf && <EditProfileButton />}
          <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
            <BasicInfoCard isSelf={isSelf} user={user} />
            <BioCard user={user} />
          </div>
        </div> */}
      </div>
    </>
  );
}
