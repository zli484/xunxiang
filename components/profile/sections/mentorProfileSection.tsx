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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Clock,
  MessageSquare,
  Languages,
  Award,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { UserWithProfiles } from "@/lib/types";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import MentorshipRequestModal from "./MentorshipRequestModal";
import MentorApplications from "./MentorApplications";

export default function MentorProfileSection({
  user,
}: {
  user: UserWithProfiles;
}) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      text: "John has been an incredible mentor. His guidance has been invaluable to my career growth.",
      author: "Emily S.",
    },
    {
      text: "Working with John has transformed my approach to problem-solving. He's truly inspiring!",
      author: "Michael R.",
    },
    {
      text: "John's mentorship helped me land my dream job. I'm forever grateful for his support.",
      author: "Sarah L.",
    },
  ];

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {user?.mentorProfile?.yearsOfExperience && (
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>
                  {user?.mentorProfile?.yearsOfExperience} years of experience
                </span>
              </div>
            )}
            {user?.school && (
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>{user?.school}</span>
              </div>
            )}
            <Badge>Placeholder badge</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{user?.mentorProfile?.bio}</p>
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

      <div className="flex justify-center">
        <Button size="lg" onClick={() => setIsRequestModalOpen(true)}>
          Request Mentorship
        </Button>
      </div>

      {isRequestModalOpen && (
        <MentorshipRequestModal
          mentorUserId={user.id}
          onClose={() => setIsRequestModalOpen(false)}
        />
      )}
    </div>
  );
}
