import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createProfileAction, updateProfileAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import TextAreaInput from "@/components/form/TextAreaInput";
async function CreateProfilePage() {
  //   const user = await currentUser();

  //   if (user?.privateMetadata?.hasProfile) redirect("/");
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize"> new user</h1>
      <div className="border p-8 rounded-md ">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-1 gap-4 mt-4 mx-auto w-1/2">
            <FormInput type="text" name="firstName" label="First Name" />

            <FormInput type="text" name="lastName" label="Last Name" />
            <TextAreaInput name="bio" labelText="Bio" />
            <SubmitButton text={"Create Profile"} className="mt-8" />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfilePage;
