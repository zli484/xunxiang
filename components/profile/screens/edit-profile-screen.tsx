"use client";

import { useState, useEffect } from "react";
import { type User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfilePictureEditor from "../atoms/profile-picture-editor";
import Link from "next/link";
import { Button, Spinner } from "@chakra-ui/react";

const LINKEDIN_URL_PLACEHOLDER = "https://www.linkedin.com/in/your-handle-here";
const INSTAGRAM_HANDLE_PLACEHOLDER = "your-handle-here";

export default function EditProfile({ user }: { user: User }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // CAUTION: not formdata, technically just a state object
  const [formData, setFormData] = useState({
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    linkedInLink: user.linkedInLink,
    graduationYear: user.graduationYear, // Added field
    school: user.school, // Added field
    currentRole: user.currentRole, // Added field, assuming 'role' is the current role
    currentCompany: user.currentCompany,
  });

  //   if (!user) {
  //     router.push("/sign-in");
  //     router.refresh();
  //   }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        toast.success("Profile updated! Redirecting...");
        setTimeout(() => {
          router.push("/profile");
          router.refresh();
        }, 1000);
      } else {
        toast.error(await res.text());
      }
    });
    setLoading(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Link href="/profile" className="tetx-sm m-1 rounded btn btn-xs">
        Go back
      </Link>
      <div className="w-full flex flex-col p-32">
        {user && <ProfilePictureEditor user={user} />}

        <form onSubmit={handleSubmit} className="min-w-96">
          <div className="grid grid-cols-1 gap-3">
            <label
              htmlFor="firstName"
              className="mt-2 block text-lg font-semibold"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName ? formData.firstName : ""}
              onChange={handleChange}
              className="rounded bg-slate-100 p-2"
              placeholder="First Name"
              required
            />
            <label
              htmlFor="lastName"
              className="mt-2 block text-lg font-semibold"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName ? formData.lastName : ""}
              onChange={handleChange}
              className="rounded bg-slate-100 p-2"
              placeholder="Last Name"
              required
            />
            <label htmlFor="bio" className="mt-2 block text-lg font-semibold">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              value={formData.bio ? formData.bio : ""}
              onChange={handleChange}
              className="h-60 rounded bg-slate-100 p-2"
              placeholder="Bio"
              required
            />
            <label
              htmlFor="linkedIn"
              className="mt-2 block text-lg font-semibold"
            >
              LinkedIn URL
            </label>
            <input
              type="text"
              name="linkedInLink"
              id="linkedInLink"
              value={formData.linkedInLink ? formData.linkedInLink : ""}
              onChange={handleChange}
              className="rounded bg-slate-100 p-2"
              placeholder={LINKEDIN_URL_PLACEHOLDER}
            />
            <label
              htmlFor="graduationYear"
              className="mt-2 block text-lg font-semibold"
            >
              Graduation Year
            </label>
            <input
              type="number"
              name="graduationYear"
              id="graduationYear"
              value={formData.graduationYear ? formData.graduationYear : ""}
              onChange={handleChange}
              className="rounded bg-slate-100 p-2"
              placeholder="Graduation Year"
            />
            <label
              htmlFor="school"
              className="mt-2 block text-lg font-semibold"
            >
              School
            </label>
            <input
              type="text"
              name="school"
              id="school"
              value={formData.school ? formData.school : ""}
              onChange={handleChange}
              className="rounded bg-slate-100 p-2"
              placeholder="School"
            />
            <label
              htmlFor="currentRole"
              className="mt-2 block text-lg font-semibold"
            >
              Current Role
            </label>
            <input
              type="text"
              name="currentRole"
              id="currentRole"
              value={formData.currentRole ? formData.currentRole : ""}
              onChange={handleChange}
              className="rounded bg-slate-100 p-2"
              placeholder="Current Role"
            />
            <label
              htmlFor="currentCompany"
              className="mt-2 block text-lg font-semibold"
            >
              Current Company
            </label>
            <input
              type="text"
              name="currentCompany"
              id="currentCompany"
              value={formData.currentCompany ? formData.currentCompany : ""}
              onChange={handleChange}
              className="rounded bg-slate-100 p-2"
              placeholder="Current Company"
            />
            <Button
              type="submit"
              colorScheme="pink"
              className="mt-6 roundedpx-4 py-2 font-bold text-background"
            >
              {loading ? <Spinner /> : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
