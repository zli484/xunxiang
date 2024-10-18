"use client";

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
import MentorProfileSection from "../sections/mentorProfileSection";
import { UserWithProfiles } from "@/lib/types";
import NameAndSocialsSection from "../sections/nameAndSocialSection";
import MainPhotoSection from "../sections/mainPhotoSection";
import { useRef, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Divide } from "lucide-react";

export default function ProfileScreenForOthers({
  user,
  currentUser,
}: {
  user: UserWithProfiles;
  currentUser: UserWithProfiles;
}) {
  const photoSectionRef = useRef<HTMLDivElement>(null);
  const [photoHeight, setPhotoHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateHeight = () => {
      if (photoSectionRef.current) {
        setPhotoHeight(photoSectionRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <div className="container mx-auto p-12">
        <Tabs defaultValue="basicInfo" className="flex flex-col">
          <div className="flex items-center">
            <TabsList className="">
              <TabsTrigger value="basicInfo">Info</TabsTrigger>

              {user.isMentor && (
                <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
              )}
            </TabsList>
          </div>
          <div>
            <TabsContent value="basicInfo">
              <div>
                <NameAndSocialsSection profile={user} />

                <div className="flex justify-between gap-24">
                  <div ref={photoSectionRef} className="min-h-[200px] w-full ">
                    <MainPhotoSection
                      profilePicURL={user.profilePictureURL || ""}
                    />
                  </div>
                  <div
                    className="min-h-[200px] w-full overflow-y-scroll"
                    style={{
                      maxHeight: photoHeight ? `${photoHeight}px` : "auto",
                    }}
                  >
                    <div className="text-md mb-4">
                      A QUOTE THAT SPEAKS TO YOU:
                    </div>
                    <div className=" w-full h-full flex items-center justify-center">
                      <div className="italic text-lg leading-relaxed font-extrabold">
                        TO BE ADDED BY THE USER
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-12" />

                <div className="flex justify-between gap-24">
                  <div ref={photoSectionRef} className="min-h-[200px] w-full ">
                    <div className="text-md mb-4">MY STORY:</div>
                    <div className=" w-full flex items-center justify-center">
                      <blockquote className="text-md p-4">
                        {user.bio || ""}
                      </blockquote>
                    </div>
                  </div>
                  <div
                    className="min-h-[200px] w-full overflow-y-scroll"
                    style={{
                      maxHeight: photoHeight ? `${photoHeight}px` : "auto",
                    }}
                  ></div>
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent value="questions">
              <div className="grid grid-cols-1 md:grid-cols-2 self-center justify-items-center max-w-4xl gap-6 lg:gap-8 lg:mx-20 rounded-xl p-6">
                <QuestionsSection userId={user.id} />
              </div>
            </TabsContent> */}
            <div className="w-full">
              {user.isMentor && (
                <TabsContent value="mentorship">
                  <div className="">
                    <MentorProfileSection
                      user={user}
                      currentUser={currentUser}
                    />
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
