import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  HeartIcon,
  MessageCircleIcon,
  RocketIcon,
  SparklesIcon,
} from "lucide-react";
import { User } from "@prisma/client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function MentorCard({ user }: { user: User }) {
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
            <p className="text-sm transition-transform duration-300 ease-in-out group-hover:translate-y-[-4px]">
              {user.currentRole} at {user.currentCompany}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
