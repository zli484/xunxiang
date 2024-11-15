"use client";

import React from "react";
import { type User } from "@prisma/client";
import { useRef, useEffect, useState } from "react";
import NameAndSocialsSection from "../sections/nameAndSocialSection";
import Image from "next/image";
import user_placeholder_male from "@/public/img/placeholders/profile_card/male.png";
import Link from "next/link";
import AskQuestionButton from "../../modals/askQuestionButton";
import ConnectButton from "../sections/connectButton";
import { Card } from "@/components/ui/card";
import EditProfileButton from "../atoms/editProfileButton";
import MainPhotoSection from "./mainPhotoSection";
import { Separator } from "@/components/ui/separator";

export default function ProfileInfoDisplay({
  isSelf,
  user,
}: {
  isSelf: Boolean;
  user: User;
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
    <div>
      <div className="flex justify-end">{isSelf && <EditProfileButton />}</div>
      <NameAndSocialsSection profile={user} />

      <div className="flex justify-between gap-24">
        <div ref={photoSectionRef} className="min-h-[200px] w-full">
          <MainPhotoSection profilePicURL={user.profilePictureURL || ""} />
        </div>
        <div
          className="min-h-[200px] w-full"
          // style={{
          //   height: photoHeight ? `${photoHeight}px` : "auto",
          //   overflowY: "auto",
          // }}
        >
          <div className="w-full h-full">
            <blockquote className="text-md p-4  break-words z-50">
              {user.bio || ""}
            </blockquote>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* <div className="flex justify-between gap-24">
        <div ref={photoSectionRef} className="min-h-[200px] w-full "></div>
        <div
          className="min-h-[200px] w-full overflow-y-scroll"
          style={{
            maxHeight: photoHeight ? `${photoHeight}px` : "auto",
          }}
        ></div>
      </div> */}
    </div>
  );
}
