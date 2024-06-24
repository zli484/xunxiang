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

export default function ProfileScreen({
  isSelf,
  user,
}: {
  isSelf: Boolean;
  user: User;
}) {
  return (
    <>
      <>
        {isSelf && <EditProfileButton />}
        <Tabs defaultValue="basicInfo" className="flex">
          <div className="flex items-center">
            <TabsList className="">
              <TabsTrigger value="basicInfo">Info</TabsTrigger>
              <TabsTrigger value="bio">Bio</TabsTrigger>
              <TabsTrigger value="questions">Quesions</TabsTrigger>
            </TabsList>
          </div>
          <div>
            <TabsContent value="basicInfo">
              <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
                <BasicInfoCard isSelf={isSelf} user={user} />
              </div>
            </TabsContent>
            <TabsContent value="bio">
              <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
                <BioCard user={user} />
              </div>
            </TabsContent>
          </div>
        </Tabs>
        {/* <div className="flex flex-col w-full bg-white">
          {isSelf && <EditProfileButton />}
          <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
            <BasicInfoCard isSelf={isSelf} user={user} />
            <BioCard user={user} />
          </div>
        </div> */}
      </>
    </>
  );
}
