"use client";

import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  MapPin,
  Briefcase,
  School,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import QuestionsSection from "../sections/questionsSection";

interface ProfileScreenForSelfProps {
  user: User;
}

export default function ProfileScreenForSelf({
  user,
}: ProfileScreenForSelfProps) {
  return (
    <div className="container mx-auto px-6 py-8 max-w-[1200px]">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex gap-8 items-start">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              {user.profilePictureURL ? (
                <img
                  src={user.profilePictureURL}
                  alt={`${user.firstName}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#F2F2F2] flex items-center justify-center">
                  <span className="text-[32px] text-[#767676]">
                    {user.firstName?.[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div>
            <h1 className="text-[32px] font-bold text-[#484848] mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <div className="space-y-2 text-[#767676]">
              {user.currentRole && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <span>
                    {user.currentRole}{" "}
                    {user.currentCompany && `at ${user.currentCompany}`}
                  </span>
                </div>
              )}
              {user.school && (
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  <span>{user.school}</span>
                </div>
              )}
              {user.currentCity && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{user.currentCity}</span>
                </div>
              )}
              {user.graduationYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Class of {user.graduationYear}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Link href="/profile/edit">
          <Button className="bg-[#FF5A5F] hover:bg-[#FF5A5F]/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="about" className="space-y-12">
        <TabsList className="bg-[#F2F2F2] p-1 rounded-lg">
          <TabsTrigger
            value="about"
            className="data-[state=active]:bg-white data-[state=active]:text-[#484848]"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="questions"
            className="data-[state=active]:bg-white data-[state=active]:text-[#484848]"
          >
            Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="space-y-16">
            {/* About Section */}
            <section>
              <h2 className="text-[24px] font-semibold text-[#484848] mb-6">
                About
              </h2>
              <div className="max-w-3xl">
                <p className="text-[16px] leading-relaxed text-[#484848] whitespace-pre-wrap">
                  {user.bio || "No bio added yet."}
                </p>
              </div>
            </section>

            {/* Career Goals Section - New */}
            {user.careerGoal && (
              <section>
                <h2 className="text-[24px] font-semibold text-[#484848] mb-6">
                  Career Goals
                </h2>
                <div className="max-w-3xl">
                  <p className="text-[16px] leading-relaxed text-[#484848]">
                    {user.careerGoal}
                  </p>
                </div>
              </section>
            )}

            {/* Tags Section */}
            <section>
              <h2 className="text-[24px] font-semibold text-[#484848] mb-6">
                Areas of Interest
              </h2>
              <div className="space-y-8">
                {user.professionalTags && user.professionalTags.length > 0 && (
                  <div>
                    <h3 className="text-[18px] font-medium text-[#484848] mb-4">
                      Professional Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.professionalTags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="px-4 py-2 bg-[#F7F7F7] text-[#484848] hover:bg-[#EFEFEF] border-none"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user.personalTags && user.personalTags.length > 0 && (
                  <div>
                    <h3 className="text-[18px] font-medium text-[#484848] mb-4">
                      Personal Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.personalTags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="px-4 py-2 bg-[#F7F7F7] text-[#484848] hover:bg-[#EFEFEF] border-none"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Education & Experience Section - New */}
            <section>
              <h2 className="text-[24px] font-semibold text-[#484848] mb-6">
                Education & Experience
              </h2>
              <div className="space-y-6">
                {user.school && (
                  <div className="flex items-start gap-4">
                    <School className="h-6 w-6 text-[#767676] mt-1" />
                    <div>
                      <h3 className="text-[18px] font-medium text-[#484848]">
                        {user.school}
                      </h3>
                      {user.major && (
                        <p className="text-[16px] text-[#767676]">
                          {user.major}
                        </p>
                      )}
                      {user.graduationYear && (
                        <p className="text-[14px] text-[#767676]">
                          Class of {user.graduationYear}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {user.currentRole && (
                  <div className="flex items-start gap-4">
                    <Briefcase className="h-6 w-6 text-[#767676] mt-1" />
                    <div>
                      <h3 className="text-[18px] font-medium text-[#484848]">
                        {user.currentRole}
                      </h3>
                      {user.currentCompany && (
                        <p className="text-[16px] text-[#767676]">
                          {user.currentCompany}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Connect Section */}
            {(user.linkedInLink ||
              user.instagramLink ||
              user.twitterLink ||
              user.wechatId) && (
              <section>
                <h2 className="text-[24px] font-semibold text-[#484848] mb-6">
                  Connect
                </h2>
                <div className="flex flex-wrap gap-6">
                  {user.linkedInLink && (
                    <a
                      href={user.linkedInLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#484848] hover:text-[#FF5A5F] transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center group-hover:bg-[#FF5A5F]/10 transition-colors">
                        <LinkIcon className="h-6 w-6" />
                      </div>
                      <span className="text-[16px] font-medium">LinkedIn</span>
                    </a>
                  )}
                  {/* Add similar styled links for other social media */}
                </div>
              </section>
            )}
          </div>
        </TabsContent>

        <TabsContent value="questions">
          <QuestionsSection user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
