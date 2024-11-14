"use client";

import { useState } from "react";
import { type User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import UserContactInfoModal from "./user-contact-info-modal";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { UserWithProfiles } from "@/lib/types";

export function UserCard({
  user,
  isSaved = null,
}: {
  user: UserWithProfiles;
  isSaved?: boolean | null;
}) {
  if (!user) {
    return null;
  }

  return (
    <Link href={`/user/${user.id}`} className="block">
      <Card className="w-[400px] overflow-hidden m-3 relative cursor-pointer transition-transform duration-300 hover:scale-105">
        <div className="relative group">
          <AspectRatio ratio={1 / 1} className="w-full">
            {user.profilePictureURL ? (
              <Image
                src={user.profilePictureURL}
                alt={`${user.firstName}'s profile`}
                fill
                className="object-cover"
              />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </AspectRatio>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white transition-transform duration-300 ease-in-out group-hover:translate-y-[-8px]">
            <h2 className="text-4xl font-bold mb-1 transition-transform duration-300 ease-in-out group-hover:translate-y-[-4px]">
              {user.firstName} {user.lastName}
            </h2>
            <div className="space-y-1">
              {user.school && (
                <p className="text-sm transition-transform duration-300 ease-in-out group-hover:translate-y-[-4px]">
                  {user.school}
                </p>
              )}
              {user.major && (
                <p className="text-sm transition-transform duration-300 ease-in-out group-hover:translate-y-[-4px]">
                  {user.major}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.interests
                ?.split(/[\s,，、；/;|]+/)
                .slice(0, 3)
                .map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-white/20 text-white hover:bg-white/30"
                  >
                    {interest}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
