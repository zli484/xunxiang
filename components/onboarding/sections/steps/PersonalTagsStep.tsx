import React from "react";

import {
  SignUpStep,
  SignUpFormData,
} from "@/types/onboardingMultiStepCreation";
import LaraChatBubble from "@/components/core-ui/lara-chat-bubble";

export async function validatePersonalTags({
  formData,
  setFormData,
}: {
  formData: SignUpFormData;
  setFormData: (formData: SignUpFormData) => void;
}) {
  if (!formData.personalTags || formData.personalTags.length < 3) {
    return "Please select at least 3 tags";
  }
  await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalTags: formData.personalTags,
    }),
  });

  return "";
}

const INTEREST_TAGS = [
  "Art",
  "Board Games",
  "Camping",
  "Coding",
  "Cooking",
  "Crafts",
  "Cycling",
  "Dance",
  "DIY",
  "Fashion",
  "Fishing",
  "Fitness",
  "Gaming",
  "Gardening",
  "Hiking",
  "History",
  "Ice Skating",
  "Investing",
  "Meditation",
  "Movies",
  "Music",
  "Pets",
  "Photography",
  "Podcasts",
  "Politics",
  "Reading",
  "Sports",
  "Theater",
  "Travel",
  "Wine Tasting",
  "Yoga",
];

export default function PersonalTagsStep({
  formData,
  setFormData,
}: SignUpStep) {
  const toggleTag = (tag: string) => {
    let newPersonalTags = [...formData.personalTags];
    if (newPersonalTags.includes(tag)) {
      newPersonalTags = newPersonalTags.filter((t) => t !== tag);
    } else {
      newPersonalTags.push(tag);
    }
    setFormData({ ...formData, personalTags: newPersonalTags });
  };

  // sort interest tags
  INTEREST_TAGS.sort();

  return (
    <div className="flex flex-col items-center mb-10 space-y-6 min-w-1/2 mx-auto">
      <div className="space-y-6 mb-10">
        <LaraChatBubble
          text="Similarly, could you please let me know more about your personal
            interests?"
        />
      </div>
      <div className="flex flex-wrap justify-start">
        {INTEREST_TAGS.map((tag, index) => (
          <div
            key={index}
            onClick={() => toggleTag(tag)}
            className={`${
              formData.personalTags.includes(tag)
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
