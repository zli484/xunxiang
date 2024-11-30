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
import {
  User as UserIcon,
  BookOpen,
  Building2,
  Briefcase,
  LinkedinIcon,
  GraduationCap,
  ScrollText,
} from "lucide-react";
import { User } from "@prisma/client";

export default function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    linkedInLink: user.linkedInLink,
    graduationYear: user.graduationYear,
    school: user.school,
    currentRole: user.currentRole,
    currentCompany: user.currentCompany,
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
        if (value !== null) {
          formDataToSend.append(key, String(value));
        }
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
    <div className="min-h-screen bg-background/50 py-16 overflow-y-auto">
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
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="w-40 h-40">
                  <ImageInputContainer
                    onImageChange={handleImageChange}
                    defaultImageUrl={DefaultAvatar.src}
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                  <UserIcon className="w-5 h-5 text-neutral-500" />
                  <h2 className="text-lg font-semibold">
                    Personal Information
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ScrollText className="w-4 h-4 text-neutral-500" />
                    <label className="text-sm font-medium">Bio</label>
                  </div>
                  <Textarea
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio || ""}
                    onChange={handleChange}
                    className="min-h-[120px]"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                  <BookOpen className="w-5 h-5 text-neutral-500" />
                  <h2 className="text-lg font-semibold">Education</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-neutral-500" />
                      <label className="text-sm font-medium">School</label>
                    </div>
                    <Input
                      type="text"
                      name="school"
                      placeholder="University Name"
                      value={formData.school || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-neutral-500" />
                      <label className="text-sm font-medium">
                        Graduation Year
                      </label>
                    </div>
                    <Input
                      type="number"
                      name="graduationYear"
                      placeholder="2024"
                      value={formData.graduationYear?.toString() || ""}
                      onChange={handleChange}
                      onWheel={(e) => {
                        //@ts-ignore
                        e.target.blur();
                      }} // Prevent value change on scroll
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                  <Briefcase className="w-5 h-5 text-neutral-500" />
                  <h2 className="text-lg font-semibold">
                    Professional Information
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Role</label>
                    <Input
                      type="text"
                      name="currentRole"
                      placeholder="Software Engineer"
                      value={formData.currentRole || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Current Company
                    </label>
                    <Input
                      type="text"
                      name="currentCompany"
                      placeholder="Company Name"
                      value={formData.currentCompany || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center gap-2">
                      <LinkedinIcon className="w-4 h-4 text-neutral-500" />
                      <label className="text-sm font-medium">
                        LinkedIn URL
                      </label>
                    </div>
                    <Input
                      type="text"
                      name="linkedInLink"
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedInLink || ""}
                      onChange={handleChange}
                    />
                  </div>
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
    </div>
  );
}
