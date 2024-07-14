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

export function UserCardMini({ user }: { user: User }) {
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

      <Card className="relative w-full">
        <div className="flex flex-col">
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push(`/user/${user.userId}`);
            }}
          >
            <div className="flex w-full justify-evenly p-3">
              <div className="w-1/2">
                <Avatar className="w-8 h-8">
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
                <div className="space-y-1">
                  {user.graduationYear && (
                    <p className=" text-xs">Class of {user.graduationYear}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
