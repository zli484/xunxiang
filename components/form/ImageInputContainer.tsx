"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface ImageInputContainerProps {
  onImageChange: (file: File | null) => void;
  defaultImageUrl?: string;
}

const ImageInputContainer: React.FC<ImageInputContainerProps> = ({
  onImageChange,
  defaultImageUrl = "/default-avatar.png",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={previewUrl || defaultImageUrl}
          alt="Profile picture"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
        {previewUrl && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="flex items-center"
      >
        <Camera className="mr-2" size={16} />
        {previewUrl ? "Change Picture" : "Upload Picture"}
      </Button>
    </div>
  );
};

export default ImageInputContainer;
