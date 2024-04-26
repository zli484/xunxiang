"use client";

import {
  SignUpStep,
  SignUpFormData,
} from "@/types/onboardingMultiStepCreation";
import LaraChatBubble from "@/components/core-ui/lara-chat-bubble";

import React from "react";
import Cropper from "react-easy-crop";
import { default as NextImage } from "next/image";
import goodExample from "@/public/img/onboarding/onboarding_profilePicUpload_Right.png";
import badExample from "@/public/img/onboarding/onboarding_profilePicUpload_Wrong.png";
import uploadActionButton from "@/public/img/onboarding/onboarding_photo_uploadButton.png";
import { cropImage } from "@/lib/images";

import Image from "next/image";
import lara from "@/public/img/lara_7.png";
import { Divider } from "@chakra-ui/react";
const UPDATE_IMAGE_SIZE = 250;

export async function validateProfilePhoto({
  formData,
}: {
  formData: SignUpFormData;
}) {
  // Check that the photo has been set
  // if (!formData.picture) {
  //   return "Please upload a profile photo";
  // }
  console.log("validateProfilePhoto: upload picture...");

  // If the photo is a google photo, we don't need to upload it
  if (formData.picture) {
    const pictureBlob = await fetch(formData.picture)
      .then((r) => r.blob())
      .then((blob) => {
        return cropImage(blob, formData.areaPixels);
      });
    const pictureFile = new File([pictureBlob], "profile-picture");

    const data = new FormData();
    data.append("profilePicture", pictureFile);
    data.append("area", JSON.stringify(formData.areaPixels));

    return await fetch("/api/user/update/picture", {
      method: "POST",
      body: data,
    }).then(async (res) => {
      if (res.ok) {
        return "";
      }
      return await res.text();
    });
  }
  return "";
}

export default function ProfilePhotoStep({
  formData,
  setFormData,
  currentStep,
  numSteps,
}: SignUpStep) {
  const handleCropChange = (crop: { x: number; y: number }) => {
    setFormData({
      ...formData,
      crop: crop,
    });
  };
  const handleZoomChange = (zoom: number) => {
    setFormData({
      ...formData,
      zoom: zoom,
    });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const pictureURL = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, picture: pictureURL });
    }
  };

  const handleAreaPixelsChange = (c: any, p: any) => {
    setFormData({ ...formData, areaPixels: p });
  };

  return (
    <div className="flex flex-col items-center mb-10 space-y-6 min-w-1/2 mx-auto">
      <div className="space-y-6">
        <LaraChatBubble text="Could you upload a profile picture? We love cats......but it would be great if you could upload a real photo of you so that other users can recognize you!" />
        <div className="flex justify-start space-x-6">
          <NextImage
            src={goodExample}
            alt={"placeholder"}
            className="object-cover"
            width={150}
            height={150}
          />
          <NextImage
            src={badExample}
            alt={"placeholder"}
            className="object-cover"
            width={150}
            height={150}
          />
        </div>

        <Divider />

        {formData.picture && (
          <div className="m-4 flex flex-col items-center">
            <p className="mt-4 text-lg font-light mb-4">Photo Preview</p>
            <div
              style={{
                width: UPDATE_IMAGE_SIZE,
                height: UPDATE_IMAGE_SIZE,
                position: "relative",
              }}
            >
              <Cropper
                image={formData.picture}
                crop={formData.crop}
                zoom={formData.zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={handleCropChange}
                onZoomChange={handleZoomChange}
                onCropAreaChange={handleAreaPixelsChange}
              />
            </div>
          </div>
        )}
        <div className="w-full flex justify-center mb-16">
          <label
            htmlFor="image-upload"
            className="flex w-40 cursor-pointer flex-col items-center justify-center"
          >
            <div className="w-full rounded-full mt-3 p-1 ">
              <NextImage
                src={uploadActionButton}
                alt={"placeholder"}
                className="object-cover"
                width={500}
                height={500}
              />
            </div>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
