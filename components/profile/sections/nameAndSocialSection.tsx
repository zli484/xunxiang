import React from "react";
import { User } from "@prisma/client";
import { FaLinkedin } from "react-icons/fa";
import { Twitter, Instagram, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function NameAndSocialsSection({ profile }: { profile: User }) {
  return (
    <div>
      <div className="text-center">
        <div className="text-8xl font-bold mb-3">
          {profile.firstName} {profile.lastName}
        </div>

        <p className="text-3xl mb-3">
          {profile.currentRole && (
            <>
              {profile.currentRole} at {profile.currentCompany}
            </>
          )}
        </p>
        <p className="flex items-center justify-center">
          {profile.currentCity && (
            <>
              <MapPin className="w-5 h-5 mr-2" />
              {profile.currentCity}
            </>
          )}
        </p>
      </div>
      <div className="flex justify-center space-x-4 mt-12">
        {profile.linkedInLink && (
          <a
            href={profile.linkedInLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center transition-colors duration-300 hover:bg-black hover:text-white">
              <FaLinkedin className="w-5 h-5" />
            </div>
          </a>
        )}
        {profile.instagramLink && (
          <a
            href={profile.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center transition-colors duration-300 hover:bg-black hover:text-white">
              <Instagram className="w-5 h-5" />
            </div>
          </a>
        )}
      </div>

      <Separator className="my-4" />
    </div>
  );
}
