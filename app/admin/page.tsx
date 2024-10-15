"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateMentorProfiles = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/create-mentor-profiles", {
        method: "POST",
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error creating mentor profiles:", error);
      setMessage("Error creating mentor profiles");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Button onClick={handleCreateMentorProfiles} disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Mentor Profiles"}
      </Button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
