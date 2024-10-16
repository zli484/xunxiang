import { type User } from "@prisma/client";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfilePictureEditor from "../atoms/profile-picture-editor";
import Link from "next/link";
import { Button, Spinner } from "@chakra-ui/react";
import FormContainer from "@/components/form/FormContainer";
import TextAreaInput from "@/components/form/TextAreaInput";
import { updateProfileAction } from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";

import { updateProfileImageAction } from "@/utils/actions";
import ImageInputContainerLegacy from "@/components/form/ImageInputContainerLegacy";

const LINKEDIN_URL_PLACEHOLDER = "https://www.linkedin.com/in/your-handle-here";
const INSTAGRAM_HANDLE_PLACEHOLDER = "your-handle-here";

export default function EditProfileScreen({ user }: { user: User }) {
  return (
    <div>
      <Link href="/profile" className="tetx-sm m-1 rounded btn btn-xs">
        Go back
      </Link>
      <div className="w-1/2 flex flex-col p-32 mx-auto">
        {/* {user && <ProfilePictureEditor user={user} />} */}

        <ImageInputContainerLegacy
          image={user.profilePictureURL ? user.profilePictureURL : ""}
          name={user.firstName ? user.firstName : ""}
          action={updateProfileImageAction}
          text="Update Profile Image"
        />

        <FormContainer action={updateProfileAction}>
          <div className="grid grid-cols-1 gap-3">
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              defaultValue={user.firstName ? user.firstName : ""}
            />

            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              defaultValue={user.lastName ? user.lastName : ""}
            />

            <TextAreaInput
              name="bio"
              labelText="Bio"
              defaultValue={user.bio ? user.bio : ""}
            />
            <FormInput
              type="text"
              name="linkedInLink"
              label="LinkedIn URL"
              defaultValue={user.linkedInLink ? user.linkedInLink : ""}
              placeholder={LINKEDIN_URL_PLACEHOLDER}
            />
            <FormInput
              type="number"
              name="graduationYear"
              label="Graduation Year"
              defaultValue={user.graduationYear ? user.graduationYear : ""}
            />
            <FormInput
              type="text"
              name="school"
              label="School"
              defaultValue={user.school ? user.school : ""}
            />
            <FormInput
              type="text"
              name="currentRole"
              label="Current Role"
              defaultValue={user.currentRole ? user.currentRole : ""}
            />
            <FormInput
              type="text"
              name="currentCompany"
              label="Current Company"
              defaultValue={user.currentCompany ? user.currentCompany : ""}
            />
            <SubmitButton text="update profile" className="mt-8" />
          </div>
        </FormContainer>
      </div>
    </div>
  );

  // );
}
