"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function MentorProfileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bio: "",
    yearsOfExperience: "",
    pastExperience: "",
    menteeExpectations: "",
    menteeQualifications: "",
    maxMentees: "",
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
      const response = await fetch("/api/profile/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Mentor profile created successfully!");
        router.refresh(); // Refresh the page to show the new profile
      } else {
        toast.error("Failed to create mentor profile");
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
      <Input
        type="number"
        name="yearsOfExperience"
        value={formData.yearsOfExperience}
        onChange={handleChange}
        placeholder="Years of Experience"
      />
      <Textarea
        name="pastExperience"
        value={formData.pastExperience}
        onChange={handleChange}
        placeholder="Past Experience"
      />
      <Textarea
        name="menteeExpectations"
        value={formData.menteeExpectations}
        onChange={handleChange}
        placeholder="Mentee Expectations"
      />
      <Input
        name="menteeQualifications"
        value={formData.menteeQualifications}
        onChange={handleChange}
        placeholder="Mentee Qualifications (comma-separated)"
      />
      <Input
        type="number"
        name="maxMentees"
        value={formData.maxMentees}
        onChange={handleChange}
        placeholder="Max Mentees"
      />
      <Input
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        placeholder="Availability"
      />
      <Button type="submit">Create Mentor Profile</Button>
    </form>
  );
}
