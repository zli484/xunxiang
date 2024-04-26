"use client";

import Image from "next/image";
import lara from "@/public/img/lara/lara_7.png";
import Markdown from "react-markdown";

export default function LaraChatBubble({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-16 rounded-full border border-gray-100">
          <Image src={lara} alt="lara" />
        </div>
      </div>
      <div className="chat-bubble bg-blue-100 text-foreground font-outfit text-md">
        <Markdown className="text-black">{text}</Markdown>
      </div>
    </div>
  );
}
