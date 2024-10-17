"use client";

import { useState, useEffect } from "react";
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
  Eye,
  FileText,
} from "lucide-react";
import { UserWithProfiles } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationWithProfiles } from "@/lib/types";

export default function MenteeProfile({ user }: { user: UserWithProfiles }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applications, setApplications] = useState<ApplicationWithProfiles[]>(
    []
  );

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "/api/mentorship/applications/get/appliedAsMentee"
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

    fetchApplications();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {user?.menteeProfile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:bg-accent"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <CardContent className="p-6 flex items-center">
              <Eye className="w-8 h-8 mr-4 text-primary" />
              <div>
                <CardTitle className="text-lg mb-2">
                  View Mentee Profile
                </CardTitle>
                <CardDescription>
                  Click to see your full mentee profile
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:bg-accent"
            onClick={() => setIsApplicationModalOpen(true)}
          >
            <CardContent className="p-6 flex items-center">
              <FileText className="w-8 h-8 mr-4 text-primary" />
              <div>
                <CardTitle className="text-lg mb-2">
                  Mentorship Applications
                </CardTitle>
                <CardDescription>
                  Check the status of your submitted applications
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Dialog
            open={isApplicationModalOpen}
            onOpenChange={setIsApplicationModalOpen}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Your Mentorship Applications</DialogTitle>
                <DialogDescription>
                  Here is an overview of your submitted mentorship applications
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <Card key={app.id}>
                      <CardContent className="p-4">
                        <p>
                          <strong>Mentor:</strong>{" "}
                          {app.mentorProfile.user.firstName}{" "}
                          {app.mentorProfile.user.lastName}
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
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No applications submitted yet.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isProfileModalOpen}
            onOpenChange={setIsProfileModalOpen}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Your Mentee Profile</DialogTitle>
                <DialogDescription>
                  Here is an overview of your mentee profile
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
                    About Me
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.menteeProfile?.bio || "Not specified"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Target className="w-5 h-5 mr-2 text-muted-foreground" />
                    Career Goals
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.menteeProfile?.careerGoals || "Not specified"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Award className="w-5 h-5 mr-2 text-muted-foreground" />
                    Current Challenges
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.menteeProfile?.currentChallenges || "Not specified"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                    Availability
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.menteeProfile?.availability || "Not specified"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-muted-foreground" />
                    Mentor Preferences
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.menteeProfile?.mentorPreferences || "Not specified"}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
