"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Briefcase,
  GraduationCap,
  Clock,
  Target,
  Linkedin,
  Languages,
  Award,
} from "lucide-react";
import { UserWithProfiles } from "@/lib/types";
import Image from "next/image";

export default function MenteeProfile({ user }: { user: UserWithProfiles }) {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 relative">
              <Image
                src={user?.profilePictureURL || "/default-avatar.png"}
                alt={`${user?.firstName} ${user?.lastName}`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{user?.currentCity}</span>
              </div>
              {user?.email && (
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{user?.email}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Professional Background</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <div className="font-semibold">{user?.currentRole}</div>
                <div className="text-sm text-muted-foreground">
                  {user?.currentCompany}
                </div>
              </div>
            </div>
            {user?.school && (
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>{user?.school}</span>
              </div>
            )}
            <Badge>Seeking Mentorship</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentorship Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-semibold">Career Goals</div>
              <p className="text-sm text-muted-foreground">
                {user?.menteeProfile?.careerGoals || "Not specified"}
              </p>
            </div>
            <div>
              <div className="font-semibold">Current Challenges</div>
              <p className="text-sm text-muted-foreground">
                {user?.menteeProfile?.currentChallenges || "Not specified"}
              </p>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>
                Available:{" "}
                {user?.menteeProfile?.availability || "Not specified"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{user?.menteeProfile?.bio}</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <Linkedin className="w-5 h-5 mr-2 text-muted-foreground" />
              <a
                href={user?.linkedInLink || "#"}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center">
              <Languages className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>Placeholder languages</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>Placeholder awards</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mentor Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{user?.menteeProfile?.mentorPreferences || "Not specified"}</p>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button size="lg">Find a Mentor</Button>
      </div>
    </div>
  );
}
