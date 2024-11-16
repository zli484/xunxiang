"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ActivityExtended } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import ActivityDetailModal from "./ActivityDetailModal";

interface ActivityMatchingScreenProps {
  activities: ActivityExtended[];
  categories: string[];
  currentUserId: string;
}

export default function ActivityMatchingScreen({
  activities,
  categories,
  currentUserId,
}: ActivityMatchingScreenProps) {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityExtended | null>(null);

  return (
    <div className="container mx-auto px-6 py-8 max-w-[1400px]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#484848] mb-2">
            Activities
          </h1>
          <p className="text-[#767676] text-base">
            {activities.length} activities available
          </p>
        </div>
        <Button className="bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 text-white px-4 h-10 rounded-lg">
          <Plus className="mr-2 h-4 w-4" />
          Host Activity
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search activities..."
            className="pl-10 h-10 w-full"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["All", ...categories].map((filter) => (
          <Button
            key={filter}
            variant={filter === "All" ? "default" : "outline"}
            className="px-4 py-1 h-8 whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedActivity(activity)}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={
                  activity.photos.find((p) => p.isCover)?.url ||
                  "/placeholder-activity.jpg"
                }
                alt={activity.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                {activity.cost
                  ? `${activity.currency} ${activity.cost}`
                  : "Free"}
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-[16px] font-semibold text-[#484848] truncate">
                {activity.title}
              </h3>
              <p className="text-[#767676] text-xs mb-2 truncate">
                Hosted by {activity.createdByUser.firstName}{" "}
                {activity.createdByUser.lastName}
              </p>
              <div className="space-y-1 text-[#484848] text-xs">
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  {activity.startDate
                    ? formatDistanceToNow(activity.startDate, {
                        addSuffix: true,
                      })
                    : "Flexible"}
                </div>
                <div className="flex items-center gap-1">
                  <span>👥</span>
                  {activity.participants.length}/
                  {activity.maxParticipants || "∞"}
                </div>
                <div className="flex items-center gap-1 truncate">
                  <span>📍</span>
                  {activity.location || "TBD"}
                </div>
              </div>

              {/* Status Badge */}
              {activity.status !== "PUBLISHED" && (
                <div className="mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : activity.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.status.charAt(0) +
                      activity.status.slice(1).toLowerCase()}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          isOwner={selectedActivity.createdByUserId === currentUserId}
        />
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <Button variant="outline" className="h-8 px-4">
          Previous
        </Button>
        {[1, 2, 3, 4, 5].map((page) => (
          <Button
            key={page}
            variant={page === 1 ? "default" : "outline"}
            className="h-8 w-8"
          >
            {page}
          </Button>
        ))}
        <Button variant="outline" className="h-8 px-4">
          Next
        </Button>
      </div>
    </div>
  );
}
