import React from "react";

import {
  SignUpStep,
  SignUpFormData,
} from "@/types/onboardingMultiStepCreation";
import LaraChatBubble from "@/components/core-ui/lara-chat-bubble";

export async function validateProfessionalTags({
  formData,
}: {
  formData: SignUpFormData;
}) {
  if (!formData.professionalTags || formData.professionalTags.length < 3) {
    return "Please select at least 3 tags";
  }
  await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      professionalTags: formData.professionalTags,
    }),
  });
  return "";
}

const PROFESSIONAL_TAGS = [
  "Accounting",
  "Aerospace",
  "AI & ML",
  "Arts & Entertainment",
  "Automotive",
  "Biotechnology",
  "Blockchain",
  "Consulting",
  "Cybersecurity",
  "Data Science",
  "Design",
  "Education",
  "Finance",
  "Gaming Industry",
  "Healthcare",
  "Hospitality",
  "HR",
  "Legal",
  "Marketing",
  "Media & Journalism",
  "Non-Profit",
  "Project Management",
  "Product Management",
  "Public Relations",
  "Real Estate",
  "Renewable Energy",
  "Retail",
  "Sales",
  "Software Development",
  "Startups",
];

export default function ProfessionalTagsStep({
  formData,
  setFormData,
}: SignUpStep) {
  const toggleTag = (tag: string) => {
    let newProfessionalTags = [...formData.professionalTags];
    if (newProfessionalTags.includes(tag)) {
      newProfessionalTags = newProfessionalTags.filter((t) => t !== tag);
    } else {
      newProfessionalTags.push(tag);
    }
    setFormData({ ...formData, professionalTags: newProfessionalTags });
  };

  // sort professional tags
  PROFESSIONAL_TAGS.sort();

  return (
    <div className="flex flex-col items-center mb-10 space-y-6 min-w-1/2 mx-auto">
      <div className="space-y-6 mb-10">
        <LaraChatBubble
          text="Please select your professional interests so that we can provide a
            more tailored experience for you."
        />
        <LaraChatBubble text="Please select at least 3 tags" />
      </div>

      <div className="flex flex-wrap justify-start">
        {PROFESSIONAL_TAGS.map((tag, index) => (
          <div
            key={index}
            onClick={() => toggleTag(tag)}
            className={`${
              formData.professionalTags.includes(tag)
                ? "bg-pink-300 text-background"
                : "bg-pink-100 text-foreground"
            } m-2 py-2 px-4 rounded-full cursor-pointer`}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
