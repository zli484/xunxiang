import React from "react";
import { type User } from "@prisma/client";
import Image from "next/image";
import user_placeholder_male from "@/public/img/placeholders/profile_card/male.png";
import Link from "next/link";
import AskQuestionButton from "../../modals/askQuestionButton";
import ConnectButton from "../sections/connectButton";

export default function BasicInfoCard({
  isSelf,
  user,
}: {
  isSelf: Boolean;
  user: User;
}) {
  return (
    <div className="flex flex-col aspect-square w-full h-full bg-background shadow-2xl shadow-slate-200 items-center space-y-2 rounded-2xl">
      <Image
        src={
          user?.profilePictureURL
            ? user.profilePictureURL
            : user_placeholder_male
        }
        alt={`${user?.firstName}`}
        className="mx-auto h-32 w-32 rounded-full object-cover shadow m-6"
        width={128}
        height={128}
      />
      <div>
        <h2 className="text-2xl font-bold">{user?.firstName}</h2>
      </div>

      <div>
        {user?.linkedInLink && (
          <Link href={user.linkedInLink} prefetch={false}>
            <i className="fa-brands fa-linkedin fa-lg"></i>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 p-3 width-full">
        <div>
          <p className="font-thin text-xs"> School</p>
          <p className="font-thin text-xs">{user?.school}</p>
        </div>
        <div>
          <p className="font-thin text-xs"> Graduation Year</p>
          <p className="font-thin text-xs">{user?.graduationYear}</p>
        </div>
        <div>
          <p className="font-thin text-xs"> Current Company</p>
          <p className="font-thin text-xs">{user?.currentCompany}</p>
        </div>
        <div>
          <p className="font-thin text-xs"> Current Role</p>
          <p className="font-thin text-xs">{user?.currentRole}</p>
        </div>
      </div>
      {!isSelf && (
        <>
          <ConnectButton user={user} />
          <AskQuestionButton user={user} />
        </>
      )}
    </div>
  );
}
