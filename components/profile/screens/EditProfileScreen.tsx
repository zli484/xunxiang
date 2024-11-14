"use client";

import { type User } from "@prisma/client";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import FormContainer from "@/components/form/FormContainer";
import TextAreaInput from "@/components/form/TextAreaInput";
import FormInput from "@/components/form/FormInput";
import ImageInputContainerLegacy from "@/components/form/ImageInputContainerLegacy";
import { updateProfileAction, updateProfileImageAction } from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";

const LINKEDIN_URL_PLACEHOLDER = "https://www.linkedin.com/in/your-handle-here";

export default function EditProfileScreen({ user }: { user: User }) {
  return (
    <section className="min-h-[calc(100vh-57px)] bg-background/50 py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <Link
          href="/profile"
          className="inline-block mb-6 text-sm font-medium hover:underline"
        >
          ← Back to Profile
        </Link>

        <Card className="border-none shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text text-transparent">
              Edit Your Profile
            </CardTitle>
            <CardDescription className="text-lg">
              Update your information and profile picture
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-10 flex justify-center">
              <ImageInputContainerLegacy
                image={user.profilePictureURL || ""}
                name={user.firstName || ""}
                action={updateProfileImageAction}
                text="Update Profile Image"
              />
            </div>

            <FormContainer action={updateProfileAction}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="firstName"
                    label="First Name"
                    defaultValue={user.firstName || ""}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="lastName"
                    label="Last Name"
                    defaultValue={user.lastName || ""}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <TextAreaInput
                    name="bio"
                    labelText="Bio"
                    defaultValue={user.bio || ""}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="linkedInLink"
                    label="LinkedIn URL"
                    defaultValue={user.linkedInLink || ""}
                    placeholder={LINKEDIN_URL_PLACEHOLDER}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="number"
                    name="graduationYear"
                    label="Graduation Year"
                    defaultValue={user.graduationYear || ""}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="school"
                    label="School"
                    defaultValue={user.school || ""}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="currentRole"
                    label="Current Role"
                    defaultValue={user.currentRole || ""}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <FormInput
                    type="text"
                    name="currentCompany"
                    label="Current Company"
                    defaultValue={user.currentCompany || ""}
                  />
                </div>
              </div>

              <div className="mt-8">
                <SubmitButton
                  text="Update Profile"
                  className="w-full max-w-md mx-auto block text-lg font-medium 
                           bg-gradient-to-r from-neutral-950 to-neutral-800 hover:from-neutral-900 hover:to-neutral-700
                           transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                />
              </div>
            </FormContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
