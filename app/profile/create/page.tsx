"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import toast from "react-hot-toast";
import DefaultAvatar from "@/public/default-avatar.jpg";

export default function CreateProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    linkedInLink: "",
    graduationYear: "",
    school: "",
    currentRole: "",
    currentCompany: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File | null) => {
    setProfileImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      const response = await fetch("/api/profile/create", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Profile created successfully!");
        router.push("/profile");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create profile");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <section className="min-h-[calc(100vh-57px)] bg-background/50 py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text text-transparent">
              Create Your Profile
            </CardTitle>
            <CardDescription className="text-lg">
              Share your journey and expertise with the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-10 flex justify-center">
                <div className="w-40 h-40">
                  <ImageInputContainer
                    onImageChange={handleImageChange}
                    defaultImageUrl={DefaultAvatar.src}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Bio
                  </label>
                  <Textarea
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    LinkedIn URL
                  </label>
                  <Input
                    type="text"
                    name="linkedInLink"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedInLink}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Graduation Year
                  </label>
                  <Input
                    type="number"
                    name="graduationYear"
                    placeholder="2024"
                    value={formData.graduationYear}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    School
                  </label>
                  <Input
                    type="text"
                    name="school"
                    placeholder="University Name"
                    value={formData.school}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Current Role
                  </label>
                  <Input
                    type="text"
                    name="currentRole"
                    placeholder="Software Engineer"
                    value={formData.currentRole}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Current Company
                  </label>
                  <Input
                    type="text"
                    name="currentCompany"
                    placeholder="Company Name"
                    value={formData.currentCompany}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full max-w-md mx-auto block text-lg font-medium 
                         bg-gradient-to-r from-neutral-950 to-neutral-800 hover:from-neutral-900 hover:to-neutral-700
                         transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
