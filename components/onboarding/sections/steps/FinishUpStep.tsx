"use client";

import {
  SignUpStep,
  SignUpFormData,
} from "@/types/onboardingMultiStepCreation";
import Image from "next/image";
import lara from "@/public/img/lara_7.png";
import Lottie from "lottie-react";
import LaraChatBubble from "@/components/core-ui/lara-chat-bubble";
import congratulation_animation_1 from "@/public/img/animations/congratulatiion_1.json";

export default function FinishUpStep({
  formData,
  setFormData,
  currentStep,
  numSteps,
}: SignUpStep) {
  return (
    <div className="flex flex-col items-center mb-10 space-y-6 min-w-1/2 mx-auto">
      <LaraChatBubble
        text="Congrats on finishing onboarding! I look forward to getting to know
            you better and to help you connect with the people in our community!"
      />
      <Lottie loop={true} animationData={congratulation_animation_1} />
    </div>
  );
}
