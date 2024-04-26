"use client";

import {
  SignUpStep,
  SignUpFormData,
} from "@/types/onboardingMultiStepCreation";
import LaraChatBubble from "@/components/core-ui/lara-chat-bubble";

import { Select } from "@chakra-ui/react";

export async function validateGender({
  formData,
}: {
  formData: SignUpFormData;
}) {
  if (!formData.gender) {
    return "Please specify your gender";
  }
  await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gender: formData.gender,
    }),
  });
  return "";
}

export default function GenderStep({
  formData,
  setFormData,
  currentStep,
  numSteps,
}: SignUpStep) {
  const handleChange = async (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, gender: e.target.value });
  };
  const name = formData.firstName ? formData.firstName : "friend";

  return (
    <div className="flex flex-col items-center mb-10 space-y-6 min-w-1/2 mx-auto">
      <div className="space-y-6">
        <LaraChatBubble text="What is your gender?" />
      </div>
      <div>
        <label className="text-sm" htmlFor="gender">
          Gender
        </label>

        <Select
          value={formData.gender}
          onChange={handleChange}
          placeholder="Select option"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>
      </div>
    </div>
  );
}
