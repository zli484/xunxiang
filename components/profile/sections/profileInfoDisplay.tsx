import React from "react";
import { type User } from "@prisma/client";
import Image from "next/image";
import user_placeholder_male from "@/public/img/placeholders/profile_card/male.png";
import Link from "next/link";
import AskQuestionButton from "../../modals/askQuestionButton";
import ConnectButton from "../sections/connectButton";
import { Card } from "@/components/ui/card";
import EditProfileButton from "../atoms/editProfileButton";

export default function BasicInfoCard({
  isSelf,
  user,
}: {
  isSelf: Boolean;
  user: User;
}) {
  return (
    <Card className="h-96 w-96 flex flex-col justify-between p-6">
      <div>
        <div className="flex justify-end">
          {isSelf && <EditProfileButton />}
        </div>
      </div>
      <div>
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

        <div className="grid grid-cols-2 gap-3 py-1 width-full">
          <div>
            <p className=" font-bold text-xs"> School</p>
            <p className="font-thin text-xs">{user?.school}</p>
          </div>
          <div>
            <p className="font-bold text-xs"> Graduation Year</p>
            <p className="font-thin text-xs">{user?.graduationYear}</p>
          </div>
          <div>
            <p className="font-bold text-xs"> Current Company</p>
            <p className="font-thin text-xs">{user?.currentCompany}</p>
          </div>
          <div>
            <p className="font-bold text-xs"> Current Role</p>
            <p className="font-thin text-xs">{user?.currentRole}</p>
          </div>
        </div>
      </div>
      {!isSelf && (
        <div className="flex items-end">
          <ConnectButton user={user} />
          <AskQuestionButton user={user} />
        </div>
      )}
    </Card>
  );
}
