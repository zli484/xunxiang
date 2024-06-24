"use client";
import { use, useState } from "react";
import React from "react";
import { User } from "@prisma/client";
import { Textarea } from "@chakra-ui/react";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { updateUserBioAction } from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

export default function BioCard({ user }: { user: User }) {
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <div className="flex flex-col aspect-square w-full bg-background shadow-2xl shadow-slate-200 items-center justify-center rounded-2xl">
        <div>
          {!editMode ? (
            <Card className="h-96 w-96 flex flex-col p-6">
              <div className="flex justify-end">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => toggleEditMode()}
                  aria-label="Edit bio"
                >
                  <FaEdit />
                </Button>
              </div>
              <p className="font-outfit text-sm">{user.bio}</p>
            </Card>
          ) : (
            <Card className="h-96 w-96 flex flex-col p-6">
              <FormContainer action={updateUserBioAction}>
                <TextAreaInput
                  name="bio"
                  labelText="Bio"
                  defaultValue={user.bio ? user.bio : ""}
                />
                <Button type="submit">Save</Button>
              </FormContainer>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
