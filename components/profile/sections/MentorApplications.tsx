"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ApplicationWithProfiles } from "@/lib/types";

export default function MentorApplications({
  applications,
}: {
  applications: ApplicationWithProfiles[];
}) {
  console.log("applications received are ", applications);

  // const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // const fetchApplications = async () => {
  //   console.log("debugging 0 going to fetch applications", mentorProfileId);
  //   try {
  //     const response = await fetch(
  //       `/api/mentorship/applications?mentorProfileId=${mentorProfileId}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch applications");
  //     }
  //     const data = await response.json();
  //     setApplications(data);
  //   } catch (error) {
  //     console.error("Error fetching applications:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to fetch applications",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleApplicationResponse = async (
    applicationId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      const response = await fetch(`/api/mentorship/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      // Refresh the applications list
      // fetchApplications();

      toast({
        title: "Success",
        description: `Application ${status.toLowerCase()} successfully`,
      });
    } catch (error) {
      console.error("Error updating application status:", error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  // if (isLoading) {
  //   return <div>Loading applications...</div>;
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentorship Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <p>No applications received yet.</p>
        ) : (
          applications.map((app) => (
            <Card key={app.id} className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-semibold">
                  {app.menteeProfile.user.firstName}
                  {app.menteeProfile.user.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
                <p className="mt-2">{app.message}</p>
                {app.status === "PENDING" && (
                  <div className="mt-4 space-x-2">
                    <Button
                      onClick={() =>
                        handleApplicationResponse(app.id, "ACCEPTED")
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleApplicationResponse(app.id, "REJECTED")
                      }
                    >
                      Reject
                    </Button>
                  </div>
                )}
                {app.status !== "PENDING" && (
                  <p className="mt-2 font-semibold">Status: {app.status}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}
