"use client";
import { use, useState } from "react";
import React from "react";
import { User } from "@prisma/client";
import { Textarea } from "@chakra-ui/react";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";
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
          <Card className="h-96 w-96 flex flex-col justify-center p-6">
            <div className="flex justify-center items-center">
              <p className="font-outfit text-sm">{user.bio}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
