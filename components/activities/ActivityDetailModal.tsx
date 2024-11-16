"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ActivityExtended } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  Calendar,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = activity.photos;

  const formatDateTime = (date: Date | null) => {
    if (!date) return "Flexible";
    return format(date, "PPP 'at' p");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Image Gallery */}
        <div className="relative aspect-[16/9] w-full bg-black">
          <img
            src={
              allImages[currentImageIndex]?.url || "/placeholder-activity.jpg"
            }
            alt={activity.title}
            className="w-full h-full object-contain"
          />
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full h-8 w-8"
                onClick={previousImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full h-8 w-8"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                {allImages.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[32px] font-bold text-[#484848] mb-2">
                {activity.title}
              </h1>
              <div className="flex items-center gap-2 text-[#767676]">
                <span className="text-[16px]">
                  Hosted by {activity.createdByUser.firstName}{" "}
                  {activity.createdByUser.lastName}
                </span>
                <span>•</span>
                <Badge
                  variant="outline"
                  className="text-[#FF5A5F] border-[#FF5A5F]"
                >
                  {activity.category.name}
                </Badge>
              </div>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#767676] text-[#484848]"
                >
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Host Section - New Addition */}
          <div className="border rounded-xl p-6 bg-[#F8F8F8]">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                {activity.createdByUser.profilePictureURL ? (
                  <img
                    src={activity.createdByUser.profilePictureURL}
                    alt={`${activity.createdByUser.firstName} ${activity.createdByUser.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#E8E8E8] flex items-center justify-center">
                    <User className="h-8 w-8 text-[#767676]" />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#484848]">
                      Hosted by {activity.createdByUser.firstName}{" "}
                      {activity.createdByUser.lastName}
                    </h3>
                    {activity.createdByUser.currentRole && (
                      <p className="text-[#767676] text-sm">
                        {activity.createdByUser.currentRole}
                        {activity.createdByUser.currentCompany &&
                          ` at ${activity.createdByUser.currentCompany}`}
                      </p>
                    )}
                  </div>
                  {!isOwner && (
                    <Button
                      variant="outline"
                      className="text-[#484848] border-[#767676]"
                      size="sm"
                    >
                      View Profile
                    </Button>
                  )}
                </div>

                {activity.createdByUser.bio && (
                  <p className="mt-3 text-[#484848] text-sm line-clamp-3">
                    {activity.createdByUser.bio}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {activity.createdByUser.professionalTags?.map(
                    (tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-[#F2F2F2] text-[#484848]"
                      >
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="h-6 w-6 text-[#767676] mt-1" />
                <div>
                  <h3 className="font-medium text-[#484848]">Date and Time</h3>
                  <p className="text-[#767676]">
                    {formatDateTime(activity.startDate)}
                  </p>
                  {activity.endDate && (
                    <p className="text-[#767676]">
                      Until {format(activity.endDate, "p")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-[#767676] mt-1" />
                <div>
                  <h3 className="font-medium text-[#484848]">Location</h3>
                  <p className="text-[#767676]">{activity.location || "TBD"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-[#767676] mt-1" />
                <div>
                  <h3 className="font-medium text-[#484848]">Participants</h3>
                  <p className="text-[#767676]">
                    {activity.participants.length} /{" "}
                    {activity.maxParticipants || "∞"} spots filled
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-[20px] text-[#484848]">
                About this activity
              </h3>
              <p className="text-[#484848] whitespace-pre-wrap">
                {activity.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-medium text-[#484848]">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {activity.genderPreference.replace("_", " ")}
                  </Badge>
                  <Badge variant="secondary">{activity.skillLevel}</Badge>
                </div>
                {activity.additionalRequirements && (
                  <p className="text-[#767676] text-sm mt-1">
                    {activity.additionalRequirements}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Participants Section */}
          <div>
            <h3 className="font-semibold text-[20px] text-[#484848] mb-4">
              Current Participants
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {activity.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#F7F7F7]"
                >
                  {participant.user.profilePictureURL ? (
                    <img
                      src={participant.user.profilePictureURL}
                      alt={participant.user.firstName || ""}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#E8E8E8] flex items-center justify-center">
                      <User className="h-5 w-5 text-[#767676]" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-[#484848] text-sm">
                      {participant.user.firstName} {participant.user.lastName}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {participant.status.toLowerCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          {!isOwner && (
            <div className="sticky bottom-0 bg-white pt-4 border-t border-[#F2F2F2]">
              <Button className="w-full h-12 bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 text-white font-medium">
                Request to Join
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
