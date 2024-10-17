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
import { UserWithProfiles } from "@/lib/types";

function truncate(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function MentorCard({
  user,
  isSaved = null,
}: {
  user: UserWithProfiles;
  isSaved?: boolean | null;
}) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user) {
    return null;
  }

  const handleCardClick = () => {
    router.push(`/user/${user.id}`);
  };

  return (
    <Card
      key={user.id}
      className="overflow-hidden p-3 min-h-96 space-y-3 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}
    >
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
  );
}
