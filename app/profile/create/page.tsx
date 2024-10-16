"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import { updateProfileImageAction } from "@/utils/actions";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    <section className="min-h-[calc(100vh-57px)] bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Welcome! Let's Create Your Profile
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill out the information below to get started. This will help others
          get to know you better.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex justify-center">
            <ImageInputContainer
              image={""}
              name={""}
              action={updateProfileImageAction}
              text="Create Profile Image"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="linkedInLink"
              placeholder="LinkedIn URL"
              value={formData.linkedInLink}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="graduationYear"
              placeholder="Graduation Year"
              value={formData.graduationYear}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="school"
              placeholder="School"
              value={formData.school}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="currentRole"
              placeholder="Current Role"
              value={formData.currentRole}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="currentCompany"
              placeholder="Current Company"
              value={formData.currentCompany}
              onChange={handleChange}
            />
          </div>
          <SubmitButton text="Create Profile" className="mt-8 w-full" />
        </form>
      </div>
    </section>
  );
}
