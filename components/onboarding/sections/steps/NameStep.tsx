"use client";

import {
  SignUpStep,
  SignUpFormData,
} from "@/types/onboardingMultiStepCreation";
import { Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import lara from "@/public/img/lara_7.png";
import LaraChatBubble from "@/components/core-ui/lara-chat-bubble";

export async function validateName({ formData }: { formData: SignUpFormData }) {
  // Check that the photo has been set
  if (!(formData.firstName.length >= 2)) {
    return "Please add your first and last name";
  }

  await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: formData.firstName,
    }),
  });
  return "";
}

export default function NameStep({
  formData,
  setFormData,
  currentStep,
  numSteps,
}: SignUpStep) {
  // console.log("formData", formData);

  const handleChange = (e: any) => {
    // console.log("e", e);
    e.preventDefault();
    const { firstName, value } = e.target;

    console.log("name is ", name);
    setFormData({ ...formData, firstName: value });
  };

  const nameMessage = formData.firstName
    ? `Welcome ${formData.firstName}! Please verify your name below`
    : "Please enter your full name";

  const name = formData.firstName ? formData.firstName : "friend";

  return (
    <div className="flex flex-col w-full items-center mb-10 space-y-6">
      <div className="space-y-6">
        <LaraChatBubble
          text={`Hello ${name}! My name is Lara. I look forward to being your guide to your city and connecting you with
            all the amazing people I know.`}
        />
        <LaraChatBubble text="Before we dive in, can you confirm your name for me?" />
      </div>

      <div className="flex justify-center space-x-4 w-full pt-10">
        <div className="flex flex-col w-1/2">
          <Text mb="8px">First Name</Text>
          <Input
            id="fristName"
            name="fristName"
            type="text"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
