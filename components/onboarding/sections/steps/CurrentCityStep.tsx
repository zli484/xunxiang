"use client";

import { useEffect } from "react";

import {
  SignUpStep,
  SignUpFormData,
} from "@/types/onboardingMultiStepCreation";

import Image from "next/image";
import { CITIES } from "@/lib/constants";
import lara from "@/public/img/lara_7.png";
import { Select } from "@chakra-ui/react";
import LaraChatBubble from "@/components/core-ui/lara-chat-bubble";

export async function validateCity({ formData }: { formData: SignUpFormData }) {
  // Check that the city is in the list, or that it is reasonably formatted
  if (
    !CITIES.includes(formData.currentCity) &&
    (formData.currentCity.trim().length < 2 ||
      formData.currentCity.trim().length > 50)
  ) {
    return "Please enter a valid city";
  }
  await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentCity: formData.currentCity,
    }),
  });
  return "";
}

export default function CurrentCityStep({
  formData,
  setFormData,
  currentStep,
  numSteps,
}: SignUpStep) {
  return (
    <CurrentCityStepHelper
      formData={formData}
      setFormData={setFormData}
      currentStep={currentStep}
      numSteps={numSteps}
    />
  );
}

function CurrentCityStepHelper({
  formData,
  setFormData,
  currentStep,
  numSteps,
}: SignUpStep) {
  // On initial load, set the current city to null
  useEffect(() => {
    if (formData.currentCity === "") {
      setFormData({ ...formData, currentCity: null });
    }
  });

  const handleChange = async (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, currentCity: e.target.value });
  };

  // We switch between the top options dropdown and an open text input field
  // based on whether the user has selected "Other" or not.
  const showTopCityOptions =
    formData.currentCity === null ||
    (formData.currentCity !== "Other" && CITIES.includes(formData.currentCity));

  return (
    <div className="flex flex-col items-center mb-10 space-y-6 min-w-1/2 mx-auto">
      <div className="space-y-6">
        <LaraChatBubble text="Which city do you currently live in?" />
      </div>
      <div>
        {showTopCityOptions && (
          <>
            <label className="text-sm" htmlFor="currentCity">
              City
            </label>

            <Select
              value={formData.currentCity}
              onChange={handleChange}
              placeholder="Select option"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </>
        )}
        {!showTopCityOptions && (
          <div className="mt-2">
            <label className="text-sm" htmlFor="otherCity">
              Please specify which city
            </label>
            <input
              id="otherCity"
              type="text"
              onChange={(e: any) => {
                e.preventDefault();
                setFormData({ ...formData, currentCity: e.target.value });
              }}
              className="mt-1 block w-full appearance-none rounded-full border border-muted-foreground bg-background px-6 py-4 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-md"
              placeholder="Enter city name"
            />
          </div>
        )}
      </div>
    </div>
  );
}
