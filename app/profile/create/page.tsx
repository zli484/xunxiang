import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createProfileAction, updateProfileAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Form } from "react-hook-form";
async function CreateProfilePage({ user }: { user?: User }) {
  //   const user = await currentUser();

  //   if (user?.privateMetadata?.hasProfile) redirect("/");
  return (
    <section className="h-[calc(100vh-57px)] ">
      <div className="p-8 rounded-md ">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-1 gap-4 mt-4 mx-auto w-1/2">
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              defaultValue={user?.firstName || ""}
            />
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              defaultValue={user?.lastName || ""}
            />

            <TextAreaInput
              name="bio"
              labelText="Bio"
              defaultValue={user?.bio || ""}
            />

            <FormInput
              type="text"
              name="linkedInLink"
              label="LinkedIn URL"
              defaultValue={user?.linkedInLink || ""}
              placeholder="https://www.linkedin.com/in/your-handle-here"
            />

            <FormInput
              type="number"
              name="graduationYear"
              label="Graduation Year"
              defaultValue={user?.graduationYear || ""}
            />

            <FormInput
              type="text"
              name="school"
              label="School"
              defaultValue={user?.school || ""}
            />
            <FormInput
              type="text"
              name="currentRole"
              label="Current Role"
              defaultValue={user?.currentRole || ""}
            />
            <FormInput
              type="text"
              name="currentCompany"
              label="Current Company"
              defaultValue={user?.currentCompany || ""}
            />

            <SubmitButton text={"Create Profile"} className="mt-8" />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfilePage;
