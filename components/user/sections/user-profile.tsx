// File: components/UserProfile.tsx
import Image from "next/image";
import { AspectRatio } from "@chakra-ui/react";
import React from "react";
// Adjust the import path according to your project structure
import user_placeholder_male from "@/public/img/placeholders/profile_card/male.png";
import { User } from "@prisma/client"; // Or define your own interface/type for User
import Link from "next/link";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) return null; // Optionally handle a missing user more gracefully

  return (
    <div className=" h-2/3 w-full flex flex-col sm:flex-row">
      <div className="w-full lg:w-1/3 flex-col items-start text-center space-y-3">
        <div className="w-full flex-col items-center">
          <div className="flex justify-center">
            <AspectRatio
              maxW="400px"
              ratio={1}
              className="flex-shrink h-16 w-16 rounded-full"
            >
              <Image
                className="rounded-full "
                width={100}
                height={100}
                src={
                  user?.profilePictureURL
                    ? user.profilePictureURL
                    : user_placeholder_male
                }
                alt="user profile picture"
              />
            </AspectRatio>
          </div>

          <div>
            <p className="font-sm">{user.firstName}</p>
          </div>
          <div className="space-y-1">
            {user.graduationYear && (
              <p className="text-xs">Class of {user.graduationYear}</p>
            )}

            <p className="text-xs">{user.school}</p>
            <p className="text-xs">{user.hometown}</p>
          </div>
          <div>
            {user.linkedInLink && (
              <Link href={user.linkedInLink} prefetch={false}>
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/3 p-3 flex flex-col justify-start">
        <div className="max-h-36 flex items-start overflow-y-auto">
          <p className="text-xs">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
