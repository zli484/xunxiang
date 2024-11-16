"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ActivityExtended } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface ActivityDetailModalProps {
  activity: ActivityExtended;
  isOpen: boolean;
  onClose: () => void;
  isOwner: boolean;
}

export default function ActivityDetailModal({
  activity,
  isOpen,
  onClose,
  isOwner,
}: ActivityDetailModalProps) {
  const formatDateTime = (date: Date | null) => {
    if (!date) return "Flexible";
    return format(date, "PPP 'at' p");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {activity.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Posted by {activity.createdByUser.firstName}{" "}
                {activity.createdByUser.lastName}
              </DialogDescription>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
              <img
                src={
                  activity.photos.find((p) => p.isCover)?.url ||
                  "/placeholder-activity.jpg"
                }
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {activity.photos
                .filter((p) => !p.isCover)
                .map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square overflow-hidden rounded-md"
                  >
                    <img
                      src={photo.url}
                      alt="Activity"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Activity Details */}
            <div>
              <h3 className="font-semibold mb-2">Activity Details</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {activity.category.name}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {formatDateTime(activity.startDate)}
                </p>
                {activity.endDate && (
                  <p>
                    <span className="font-medium">End Time:</span>{" "}
                    {format(activity.endDate, "p")}
                  </p>
                )}
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {activity.location || "TBD"}
                </p>
                <p>
                  <span className="font-medium">Cost:</span>{" "}
                  {activity.cost
                    ? `${activity.currency} ${activity.cost}`
                    : "Free"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm whitespace-pre-wrap">
                {activity.description}
              </p>
            </div>

            {/* Participant Requirements */}
            <div>
              <h3 className="font-semibold mb-2">Participant Requirements</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {activity.genderPreference.replace("_", " ")}
                  </Badge>
                  <Badge variant="secondary">{activity.skillLevel}</Badge>
                </div>
                {activity.additionalRequirements && (
                  <p className="text-sm">{activity.additionalRequirements}</p>
                )}
              </div>
            </div>

            {/* Participants */}
            <div>
              <h3 className="font-semibold mb-2">
                Participants ({activity.participants.length}/
                {activity.maxParticipants || "∞"})
              </h3>
              <div className="flex flex-wrap gap-2">
                {activity.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-2 bg-secondary p-2 rounded-md text-sm"
                  >
                    {participant.user.profilePictureURL ? (
                      <img
                        src={participant.user.profilePictureURL}
                        alt={participant.user.firstName || ""}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                    <span>
                      {participant.user.firstName} {participant.user.lastName}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {participant.status.toLowerCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            {!isOwner && (
              <Button className="w-full bg-[#FF5A5F] hover:bg-[#FF5A5F]/90">
                Request to Join
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
