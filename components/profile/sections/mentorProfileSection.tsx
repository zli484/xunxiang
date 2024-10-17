"use client";

import { useState, useEffect } from "react";
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
  Users,
} from "lucide-react";
import { UserWithProfiles } from "@/lib/types";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import MentorshipRequestModal from "./MentorshipRequestModal";
import MentorApplications from "./MentorApplications";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ApplicationWithProfiles } from "@/lib/types";

export default function MentorProfileSection({
  user,
  currentUser,
}: {
  user: UserWithProfiles;
  currentUser: UserWithProfiles;
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
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applications, setApplications] = useState<ApplicationWithProfiles[]>(
    []
  );

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "/api/mentorship/applications/get/receivedAsMentor"
        );
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error("Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    if (user.id === currentUser.id) {
      fetchApplications();
    }
  }, [user.id, currentUser.id]);

  const handleMentorshipRequest = () => {
    if (!currentUser.menteeProfile) {
      toast({
        title: "Mentee Profile Required",
        description:
          "Please set up your mentee profile before requesting mentorship.",
        variant: "destructive",
      });
      router.push("/profile");
    } else {
      setIsRequestModalOpen(true);
    }
  };

  const handleApplicationResponse = async (
    applicationId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      const response = await fetch("/api/mentorship/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId, status }),
      });

      if (response.ok) {
        const updatedApplication = await response.json();
        setApplications((apps) =>
          apps.map((app) =>
            app.id === updatedApplication.id
              ? { ...app, status: updatedApplication.status }
              : app
          )
        );
        toast({
          title: "Application Updated",
          description: `Application ${status} successfully.`,
          variant: "default",
        });
      } else {
        throw new Error("Failed to update application");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      toast({
        title: "Error",
        description: "Failed to update application. Please try again.",
        variant: "destructive",
      });
    }
  };

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
          </div>
        </CardContent>
      </Card>

      {user.id === currentUser.id && (
        <Card
          className="cursor-pointer hover:bg-accent"
          onClick={() => setIsApplicationModalOpen(true)}
        >
          <CardContent className="p-6 flex items-center">
            <Users className="w-8 h-8 mr-4 text-primary" />
            <div>
              <CardTitle className="text-lg mb-2">
                Mentee Applications
              </CardTitle>
              <CardDescription>
                {applications.length} application(s) received
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      )}

      {user.id != currentUser.id && (
        <div className="flex justify-center">
          <Button size="lg" onClick={handleMentorshipRequest}>
            Request Mentorship
          </Button>
        </div>
      )}

      {isRequestModalOpen && (
        <MentorshipRequestModal
          mentorUserId={user.id}
          onClose={() => setIsRequestModalOpen(false)}
        />
      )}

      <Dialog
        open={isApplicationModalOpen}
        onOpenChange={setIsApplicationModalOpen}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Mentee Applications</DialogTitle>
            <DialogDescription>
              Here's an overview of the mentee applications you've received
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {applications.length > 0 ? (
              applications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-4">
                    <p>
                      <strong>Mentee:</strong>{" "}
                      {app.menteeProfile.user.firstName}{" "}
                      {app.menteeProfile.user.lastName}
                    </p>
                    <p>
                      <strong>Status:</strong> {app.status}
                    </p>
                    <p>
                      <strong>Applied on:</strong>{" "}
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Message:</strong> {app.message}
                    </p>
                    {app.status === "PENDING" && (
                      <div className="mt-4 flex space-x-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="default">Accept</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Accept Application
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to accept this mentorship
                                application?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleApplicationResponse(app.id, "ACCEPTED")
                                }
                              >
                                Accept
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Reject</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Reject Application
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to reject this mentorship
                                application?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleApplicationResponse(app.id, "REJECTED")
                                }
                              >
                                Reject
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No applications received yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
