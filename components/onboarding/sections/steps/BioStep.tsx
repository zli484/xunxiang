"use client";

import {
  SignUpStep,
  SignUpFormData,
} from "@/types/onboardingMultiStepCreation";
import LaraChatBubble from "@/components/core-ui/lara-chat-bubble";

import Image from "next/image";
import lara from "@/public/img/lara_7.png";

import { Spinner, Textarea } from "@chakra-ui/react";

export async function validateBio({ formData }: { formData: SignUpFormData }) {
  console.log("formData.bio", formData.bio.split(" ").length);
  if (!(formData.bio.length >= 10)) {
    return "Please make your bio a bit longer";
  }

  await fetch("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bio: formData.bio,
    }),
  });
  return "";
}

export default function BioStep({
  formData,
  setFormData,
  currentStep,
  numSteps,
}: SignUpStep) {
  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("changes made", formData.bio);
  };

  return (
    <div className="flex flex-col w-full items-center mb-10">
      <div className="space-y-6 mb-10">
        <LaraChatBubble text="Awesome! Now it's time to write a great bio. It is a super important step as I would need to rely on your bio to find people who I think you might want to meet. Feel free to write the bio in a language that you feel the most comfortable with. Here are some great examples: " />
      </div>
      <div className="w-full p-4  rounded bg-background text-foreground">
        {/* <label className="block w-full">
          <span className="block text-base text-foreground mb-2">Bio</span>
          <textarea
            name="bio"
            rows={7}
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-background text-foreground"
            placeholder="Tell us about yourself..."
          ></textarea>
        </label> */}

        <Textarea
          name="bio"
          rows={7}
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
        />
        <div className="grid grid-cols-1 gap-6 mt-6 p-6 ">
          <div className="bg-pink-100 p-6 rounded-lg">
            <p className="font-bold text-sm">Example 1</p>
            <p className="text-xs">
              I am an adventurous soul who thrives on the simple pleasures of
              life. You can often find me indulging in my love for outdoor
              sports and city escapades, reveling in the excitement they bring.
              From competitive tennis matches from my upbringing in Hangzhou,
              China, to thrilling snowboarding adventures since my high school
              days up till now, I am always up for a good time. I have traveled
              around and lived on the east coast, west coast, and Midwest.
              Professionally, I am a simulation software engineer at a
              self-driving company (guess which one) in the vibrant San
              Francisco, where I have the pleasure of working with brilliant
              minds and growing in my craft. Life is a journey, and I am
              enjoying every step of the way with a smile!
            </p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg">
            <p className="font-bold text-sm">Example 2</p>
            <p className="text-xs">
              Hi大家好，我是Aiden。我曾涉猎的行业有PM/SWE/Consulting/Marketing，做过Education
              Startup，有过一次转学经历（BU→Columbia），以及在学校的社团领导经历。短期期待在美国做PM，长期期待创业。生活中的我喜欢收集咖啡☕️、咖啡店、摩天大楼的信息。政治倾向是moderate
              liberal，最喜欢的作者是Toni
              Morrison，最喜欢的音乐风格是90年代的R&B。我的性格是outgoing
              INFJ（Assertive
              Advocate），星座是双鱼座♓。如果你喜欢和一个open-minded secret
              keeper做朋友，欢迎你来联系我呀。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
