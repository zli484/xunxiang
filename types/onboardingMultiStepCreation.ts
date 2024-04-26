import { type User } from "@prisma/client";

export interface SignUpFormData {
  firstName: string;
  gender: string;
  currentCity: string;

  // Picture fields
  picture: string;
  areaPixels: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  crop: {
    x: number;
    y: number;
  };
  zoom: number;

  bio: string;
  // Tags
  professionalTags: Array<string>;
  personalTags: Array<string>;

  // Processing utils
  isLoading: boolean;
}

export type SignUpStep = {
  formData: SignUpFormData;
  setFormData: (e: any) => void;
  currentStep: number;
  numSteps: number;
};

export function getInitialSignUpFormData(user: User): SignUpFormData {
  const firstName = user.firstName || "";
  const gender = user.gender || "";
  const currentCity = user.currentCity || "";
  // By default we use the user's picture from their Google account
  const picture = user.profilePictureURL || "";
  const bio = user.bio || "";
  // Tags
  const personalTags = user.personalTags || [];
  const professionalTags = user.professionalTags || [];
  return {
    firstName,
    gender,
    currentCity,
    picture,
    areaPixels: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    crop: {
      x: 0,
      y: 0,
    },
    zoom: 1,

    bio,
    // Tags
    professionalTags,
    personalTags,
    // Processing utils
    isLoading: false,
  };
}
