import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const activities = [
  {
    title: "Basketball Game",
    date: "Next Saturday",
    participants: "3/8",
    location: "Campus Gym",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2080&auto=format&fit=crop",
    organizer: "Alex Thompson",
    price: "Free",
  },
  {
    title: "Study Group: Machine Learning",
    date: "Every Tuesday",
    participants: "4/6",
    location: "Library Room 204",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    organizer: "Sarah Chen",
    price: "Free",
  },
  {
    title: "Photography Walk",
    date: "This Sunday",
    participants: "2/5",
    location: "City Park",
    imageUrl:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
    organizer: "Michael Park",
    price: "$5",
  },
];

const activitiesData = [
  // ... existing activities ...
  // (repeated several times to simulate more data)
].concat(Array(15).fill(activities).flat()); // Simulate more activities for testing

export default function ActivityMatchingScreen() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-[1400px]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#484848] mb-2">
            Activities
          </h1>
          <p className="text-[#767676] text-base">
            {activitiesData.length} activities available
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
        {["All", "Today", "This Week", "Free", "Sports", "Study", "Social"].map(
          (filter) => (
            <Button
              key={filter}
              variant={filter === "All" ? "default" : "outline"}
              className="px-4 py-1 h-8 whitespace-nowrap"
            >
              {filter}
            </Button>
          )
        )}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {activitiesData.map((activity, index) => (
          <Card
            key={`${activity.title}-${index}`}
            className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                {activity.price}
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-[16px] font-semibold text-[#484848] truncate">
                {activity.title}
              </h3>
              <p className="text-[#767676] text-xs mb-2 truncate">
                Hosted by {activity.organizer}
              </p>
              <div className="space-y-1 text-[#484848] text-xs">
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  {activity.date}
                </div>
                <div className="flex items-center gap-1">
                  <span>👥</span>
                  {activity.participants}
                </div>
                <div className="flex items-center gap-1 truncate">
                  <span>📍</span>
                  {activity.location}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

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
