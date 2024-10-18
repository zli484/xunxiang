import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import Image from "next/image";

export default function MainPhotoSection({
  profilePicURL,
}: {
  profilePicURL: string;
}) {
  return (
    <div>
      {" "}
      <AspectRatio ratio={1 / 1} className="w-full h-full">
        {profilePicURL ? (
          <Image
            src={profilePicURL}
            alt={`profile picture`}
            fill
            className="object-cover"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </AspectRatio>
    </div>
  );
}
