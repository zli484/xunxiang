"use client";

import { useState } from "react";
import { type User } from "@prisma/client";
import { Button } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import UserContactInfoModal from "../atoms/user-contact-info-modal";
import UserProfile from "./user-profile";
import UserSaveButton from "../atoms/user-save-button";
import UserContactButton from "../atoms/user-contact-button";

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

      <div className="flex h-72 flex-col w-full p-3 shadow-lg space-x-3 rounded-lg">
        <div className="h-1/6 flex justify-start">
          <UserSaveButton isInitiallySaved={!!isSaved} userCuid={user.cuid} />
        </div>

        <UserProfile user={user} />

        <div className=" h-1/6  flex justify-end mt-3">
          <div>
            <Button
              variant="ghost"
              onClick={() => {
                router.push(`/user/${user.userId}`);
              }}
              colorScheme="blue"
              size={"sm"}
            >
              Profile
            </Button>
            <UserContactButton onOpen={onOpen} />
          </div>

          <UserContactInfoModal isOpen={isOpen} onClose={onClose} user={user} />
        </div>
      </div>
    </>
  );
}
