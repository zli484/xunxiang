"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageInputContainerProps {
  onImageChange: (file: File | null) => void;
  defaultImageUrl: string;
}

export default function ImageInputContainer({
  onImageChange,
  defaultImageUrl,
}: ImageInputContainerProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group w-40 h-40">
      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-200">
        <Image
          src={previewUrl}
          alt="Profile preview"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="text-white bg-black/50 hover:bg-black/70"
            type="button"
            onClick={handleButtonClick}
          >
            Change Photo
          </Button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
