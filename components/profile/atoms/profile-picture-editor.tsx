import React, { useState, useCallback } from "react";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/solid";
import { type User } from "@prisma/client";
import Cropper from "react-easy-crop";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cropImage } from "@/lib/images";

const UPDATE_IMAGE_SIZE = 250;

export default function ProfilePictureEditor({ user }: { user: User }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaPixels, setAreaPixels] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [currentProfilePicture, setCurrentProfilePicture] = useState(
    user.profilePictureURL || ""
  );

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = useCallback(async () => {
    console.log("onSubmit", selectedImage);
    setLoading(true);
    if (!selectedImage) {
      return;
    }
    const blob = await fetch(selectedImage)
      .then((r) => r.blob())
      .then((blob) => {
        return cropImage(blob, areaPixels);
      });
    const file = new File([blob], "profile-picture");
    const formData = new FormData();

    formData.append("profilePicture", file);
    formData.append("area", JSON.stringify(areaPixels));
    formData.append("userId", user.userId.toString());
    formData.append("userFirstName", user.firstName?.toString() || "");
    formData.append("profilePictureURL", user.profilePictureURL || "");
    const response = await fetch("/api/user/update/picture", {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      if (res.ok) {
        toast.success("Profile picture updated!");
        const { picture } = await res.json();
        setCurrentProfilePicture(picture);
      } else {
        toast.error(await res.text());
      }
    });
    setSelectedImage(null);
    setLoading(false);
    router.refresh();
  }, [selectedImage, areaPixels, user, router]);

  return (
    <div className="flex flex-grow flex-col items-center">
      <label
        htmlFor="image-upload"
        className="relative flex w-40 cursor-pointer flex-col items-center justify-center"
      >
        <Image
          src={currentProfilePicture}
          alt="Profile picture"
          width={2000}
          height={2000}
          className="rounded-full"
        />
        <div className="absolute bottom-0 right-0 rounded-full bg-foreground">
          <PencilIcon className="h-6 w-6 p-1 text-background" />
        </div>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {selectedImage && (
        <div className="m-4 flex flex-col items-center">
          <p className="mt-4 text-lg font-semibold">Photo preview</p>
          <div
            style={{
              width: UPDATE_IMAGE_SIZE,
              height: UPDATE_IMAGE_SIZE,
              position: "relative",
            }}
          >
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropAreaChange={(c, p) => {
                setAreaPixels(p);
              }}
            />
          </div>
          <button
            onClick={() => onSubmit()}
            className="mt-2 h-10 w-24 rounded bg-blue-600 font-bold text-background"
          >
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
