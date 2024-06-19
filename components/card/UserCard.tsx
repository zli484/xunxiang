// "use client";

import { useState } from "react";
import { type User } from "@prisma/client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import UserContactInfoModal from "../user/atoms/user-contact-info-modal";
import UserProfile from "../user/sections/user-profile";
import UserSaveButton from "../user/atoms/user-save-button";
import UserContactButton from "../user/atoms/user-contact-button";
import FavoriteToggleButton from "./FavoriteToggleButton";
import Image from "next/image";
import sfo from "@/public/img/cities/san_francisco.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card } from "../ui/card";
import ArrowRightIcon from "@heroicons/react/20/solid/ArrowRightIcon";

import { Divider } from "@chakra-ui/react";

export function UserCard({
  user,
  isSaved = null,
}: {
  user: User;
  isSaved?: boolean | null;
}) {
  const router = useRouter();
  // const { isOpen, onOpen, onClose } = useDisclosure();
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
          {/* <Image src={lara} alt="" className="h-40 w-full object-cover" /> */}

          <div className="h-40 w-full">
            <Image src={sfo} alt="" className="h-40 w-full object-cover" />
            <div className="absolute top-0 right-0 p-2">
              <UserSaveButton
                isInitiallySaved={!!isSaved}
                userCuid={user.cuid}
              />
            </div>
          </div>
          <div className="px-3 pb-12">
            <div className="flex w-full justify-evenly p-3">
              <div className="w-1/2">
                <Avatar className="w-24 h-24">
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
                <div>
                  <p className="text-xl font-bold mb-6">{user.firstName}</p>
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
            {/* <div className="flex flex-col justify-center my-3">
              <UserContactButton onOpen={onOpen} />
              <UserContactInfoModal
                isOpen={isOpen}
                onClose={onClose}
                user={user}
              />
              <Button
                className="mt-2"
                onClick={() => {
                  router.push(`/user/${user.userId}`);
                }}
                color={"red.300"}
                bg={"red.50"}
                size={"xs"}
              >
                Full Profile
              </Button>
            </div> */}

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
                  <p className="text-xs">{user.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 
      {
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

            <UserContactInfoModal
              isOpen={isOpen}
              onClose={onClose}
              user={user}
            />
          </div>
        </div>
      } */}
    </>

    // <>
    //   <link
    //     rel="stylesheet"
    //     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    //   />

    //   <div className="flex h-72 flex-col w-full p-3 shadow-lg space-x-3 rounded-lg">
    //     {/* <div className="absolute top-5 right-5 z-5">
    //       <FavoriteToggleButton saveReceiverUserId={user.userId} />
    //     </div> */}
    //     <div className="h-1/6 flex justify-start">
    //       <UserSaveButton isInitiallySaved={!!isSaved} userCuid={user.cuid} />
    //     </div>

    //     <UserProfile user={user} />

    //     <div className=" h-1/6  flex justify-end mt-3">
    //       <div>
    //         <Button
    //           variant="ghost"
    //           onClick={() => {
    //             router.push(`/user/${user.userId}`);
    //           }}
    //           size={"sm"}
    //         >
    //           Profile
    //         </Button>
    //         {/* <Button onClick={onOpen} variant="ghost" size="sm">
    //           Contact
    //         </Button> */}
    //       </div>

    //       {/* <UserContactInfoModal isOpen={isOpen} onClose={onClose} user={user} /> */}
    //     </div>
    //   </div>
    // </>
  );
}
