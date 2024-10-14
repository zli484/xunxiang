"use client";

import { useState } from "react";
import { type User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import UserContactInfoModal from "./user-contact-info-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ArrowRightIcon from "@heroicons/react/20/solid/ArrowRightIcon";
import { Divider } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

import { School, GraduationCap, Calendar, Home } from "lucide-react";

import { CardBody, CardContainer, CardItem } from "@/components/ui/ace/3d-card";

function truncate(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

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
    <Card key={user.id} className="overflow-hidden p-3 min-h-96 space-y-3">
      <div className="relative aspect-square w-32 h-32 mx-auto rounded-full">
        <Image
          src={user.profilePictureURL || ""}
          alt={user.firstName || ""}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <CardContent className="p-6 flex flex-col">
        <div className="space-y-2">
          {user.school && (
            <div className="flex items-center text-sm text-gray-600">
              <School className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="truncate">{user.school}</span>
            </div>
          )}
          {user.major && (
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="truncate">{user.major}</span>
            </div>
          )}
          {user.graduationYear && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="truncate">Class of {user.graduationYear}</span>
            </div>
          )}
          {user.hometown && (
            <div className="flex items-center text-sm text-gray-600">
              <Home className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="truncate">{user.hometown}</span>
            </div>
          )}
        </div>
        {user.bio && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-xs mt-2 text-gray-500  flex-grow">
                  {truncate(user.bio, 100)}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{user.bio}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardContent>

      <div className="flex flex-wrap gap-2 px-6">
        {user.interests?.split(/[\s,，、；/;|]+/).map((interest, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="text-xs bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
          >
            {interest}
          </Badge>
        ))}
      </div>
      {/* <div className="mt-4 flex flex-wrap justify-start px-6 gap-2">
        {user.interests?.split(/[\s,，、；/;|]+/).map((interest, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {interest}
          </Badge>
        ))}
      </div> */}
    </Card>
    // <>
    //   <link
    //     rel="stylesheet"
    //     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    //   />

    //   <CardContainer className="inter-var">
    //     <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:w-[30rem]  rounded-xl p-6 border  ">
    //       {/* <Card className="relative"> */}
    //       <div className="flex flex-col">
    //         <div
    //           className="px-3 p-6 cursor-pointer"
    //           onClick={() => {
    //             router.push(`/user/${user.userId}`);
    //           }}
    //         >
    //           <div className="flex w-full justify-evenly p-3">
    //             <div className="w-1/2">
    //               <Avatar className="w-28 h-28">
    //                 <AvatarImage
    //                   style={{
    //                     width: "100%",
    //                     height: "100%",
    //                     objectFit: "cover",
    //                     borderRadius: "50%",
    //                   }}
    //                   src={user.profilePictureURL || ""}
    //                 />
    //                 <AvatarFallback>CN</AvatarFallback>
    //               </Avatar>
    //             </div>

    //             <div className="w-1/2">
    //               <div className="flex items-center space-x-2">
    //                 <p className="text-xl font-bold">{user.firstName}</p>

    //                 {(user.email || user.wechatId) && (
    //                   <MdOutlineContactMail
    //                     className="cursor-pointer"
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       onOpen();
    //                     }}
    //                   />
    //                 )}
    //               </div>
    //               <div className="space-y-1">
    //                 {user.graduationYear && (
    //                   <p className=" text-xs">Class of {user.graduationYear}</p>
    //                 )}

    //                 <p className="text-xs leading-normal">{user.school}</p>
    //                 <p className="text-xs">📍 {user.hometown}</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className=" space-y-3">
    //             <div>
    //               <div className="flex items-center space-x-1">
    //                 <ArrowRightIcon className="h-5 w-5 text-red-400" />
    //                 <p className="text-xs text-red-400 font-bold ">Interest:</p>
    //               </div>
    //               <div className="max-h-32 overflow-y-auto pl-6 mt-3">
    //                 <p className="text-xs">{user.interests}</p>
    //               </div>
    //             </div>

    //             <Divider />
    //             <div>
    //               <div className="flex items-center space-x-1">
    //                 <ArrowRightIcon className="h-5 w-5 text-red-400" />
    //                 <p className="text-xs text-red-400 font-bold ">Bio:</p>
    //               </div>
    //               <div className="max-h-32 overflow-y-auto pl-6 mt-3">
    //                 {user.bio && (
    //                   <p className="text-xs">
    //                     {user.bio.length > 100
    //                       ? user.bio.slice(0, 100) + "..."
    //                       : user.bio}
    //                   </p>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <UserContactInfoModal isOpen={isOpen} onClose={onClose} user={user} />
    //       {/* </Card> */}
    //     </CardBody>
    //   </CardContainer>
    // </>
  );
}
