"use client";

import { useState } from "react";
import { type User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import UserContactInfoModal from "./user-contact-info-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "../../ui/card";
import ArrowRightIcon from "@heroicons/react/20/solid/ArrowRightIcon";
import { Divider } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import { Button } from "@/components/ui/button";

export function UserCard({
  user,
  isSaved = null,
}: {
  user: User;
  isSaved?: boolean | null;
}) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!user) {
    return;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <Card className="relative">
        <div className="flex flex-col">
          <div
            className="px-3 p-6 cursor-pointer"
            onClick={() => {
              router.push(`/user/${user.userId}`);
            }}
          >
            <div className="flex w-full justify-evenly p-3">
              <div className="w-1/2">
                <Avatar className="w-28 h-28">
                  <AvatarImage
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    src={user.profilePictureURL || ""}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div className="w-1/2">
                <div className="flex items-center space-x-2">
                  <p className="text-xl font-bold">{user.firstName}</p>

                  {(user.email || user.wechatId) && (
                    <MdOutlineContactMail
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                      }}
                    />
                  )}
                </div>
                <div className="space-y-1">
                  {user.graduationYear && (
                    <p className=" text-xs">Class of {user.graduationYear}</p>
                  )}

                  <p className="text-xs leading-normal">{user.school}</p>
                  <p className="text-xs">📍 {user.hometown}</p>
                </div>
              </div>
            </div>
            <div className=" space-y-3">
              <div>
                <div className="flex items-center space-x-1">
                  <ArrowRightIcon className="h-5 w-5 text-red-400" />
                  <p className="text-xs text-red-400 font-bold ">Interest:</p>
                </div>
                <div className="max-h-32 overflow-y-auto pl-6 mt-3">
                  <p className="text-xs">{user.interests}</p>
                </div>
              </div>

              <Divider />
              <div>
                <div className="flex items-center space-x-1">
                  <ArrowRightIcon className="h-5 w-5 text-red-400" />
                  <p className="text-xs text-red-400 font-bold ">Bio:</p>
                </div>
                <div className="max-h-32 overflow-y-auto pl-6 mt-3">
                  {user.bio && (
                    <p className="text-xs">
                      {user.bio.length > 100
                        ? user.bio.slice(0, 100) + "..."
                        : user.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserContactInfoModal isOpen={isOpen} onClose={onClose} user={user} />
      </Card>
    </>
  );
}
