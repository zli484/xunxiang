"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BecomeMentorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bio: "",
    yearsOfExperience: 0,
    menteeExpectations: "",
    maxMentees: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/mentorship/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/profile"); // Redirect to profile page after successful submission
      } else {
        throw new Error("Failed to create mentorship profile");
      }
    } catch (error) {
      console.error("Error creating mentorship profile:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Become a Mentor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bio" className="block mb-2">
            Bio
          </label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="yearsOfExperience" className="block mb-2">
            Years of Experience
          </label>
          <Input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="menteeExpectations" className="block mb-2">
            Mentee Expectations
          </label>
          <Textarea
            id="menteeExpectations"
            name="menteeExpectations"
            value={formData.menteeExpectations}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="maxMentees" className="block mb-2">
            Max Mentees
          </label>
          <Input
            type="number"
            id="maxMentees"
            name="maxMentees"
            value={formData.maxMentees}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Become a Mentor"}
        </Button>
      </form>
    </div>
  );
}
