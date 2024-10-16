"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function MenteeProfileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bio: "",
    careerGoals: "",
    currentChallenges: "",
    mentorPreferences: "",
    availability: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/mentee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Mentee profile created successfully!");
        router.refresh(); // Refresh the page to show the new profile
      } else {
        toast.error("Failed to create mentee profile");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
      />
      <Textarea
        name="careerGoals"
        value={formData.careerGoals}
        onChange={handleChange}
        placeholder="Career Goals"
      />
      <Textarea
        name="currentChallenges"
        value={formData.currentChallenges}
        onChange={handleChange}
        placeholder="Current Challenges"
      />
      <Textarea
        name="mentorPreferences"
        value={formData.mentorPreferences}
        onChange={handleChange}
        placeholder="Mentor Preferences"
      />
      <Input
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        placeholder="Availability"
      />
      <Button type="submit">Create Mentee Profile</Button>
    </form>
  );
}
