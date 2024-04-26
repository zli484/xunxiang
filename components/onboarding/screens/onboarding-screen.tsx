"use client";

import { useState, useEffect } from "react";

import {
  SignUpFormData,
  getInitialSignUpFormData,
} from "@/types/onboardingMultiStepCreation";
import { Spinner, Progress } from "@chakra-ui/react";

// Steps
import NameStep, {
  validateName,
} from "@/components/onboarding/sections/steps/NameStep";

import GenderStep, {
  validateGender,
} from "@/components/onboarding/sections/steps/GenderStep";
import CurrentCityStep, {
  validateCity,
} from "@/components/onboarding/sections/steps/CurrentCityStep";
import ProfilePhotoStep, {
  validateProfilePhoto,
} from "@/components/onboarding/sections/steps/ProfilePhotoStep";

import BioStep, {
  validateBio,
} from "@/components/onboarding/sections/steps/BioStep";

import PersonalTagsStep, {
  validatePersonalTags,
} from "@/components/onboarding/sections/steps/PersonalTagsStep";
import ProfessionalTagsStep, {
  validateProfessionalTags,
} from "@/components/onboarding/sections/steps/ProfessionalTagsStep";

import FinishUpStep from "@/components/onboarding/sections/steps/FinishUpStep";
import toast from "react-hot-toast";

import {
  DEFAULT_PAGE,
  DEFAULT_WAIT_REDIRECT,
  LONG_WAIT_REDIRECT,
} from "@/lib/constants";

import { useRouter, useSearchParams } from "next/navigation";
import { type User } from "@prisma/client";

import { Button, ButtonGroup } from "@chakra-ui/react";

function defaultValidator({ formData }: { formData: SignUpFormData }) {
  return "";
}

function getOnboardingStep(user: User) {
  return 0;
  // Edge case where the user has already finished onboarding and is trying to
  // access the onboarding page again, let them start from 0.
  // if (user.isOnboarded) {
  //   return 0;
  // }
  // // If user has specified their gender, they have completed the first 4 steps
  // if (!user.gender) {
  //   return 3;
  // }
  // // If user has specified their current city, they have completed the first 5 steps
  // if (!user.currentCity) {
  //   return 4;
  // }
  // // If user has specified their profile photo, they have completed the first 6 steps
  // if (
  //   !user.profilePictureURL ||
  //   user.profilePictureURL.startsWith("https://lh3.googleusercontent.com/")
  // ) {
  //   return 5;
  // }
  // if (!user.professionalTags || user.professionalTags.length < 3) {
  //   return 7;
  // }

  // const completedResumeInfo =
  //   user.linkedinURL &&
  //   user.college &&
  //   user.major &&
  //   user.graduationYear &&
  //   user.company &&
  //   user.jobTitle
  // // If user has specified their resume info, they have completed the first 7 steps

  // Last step – if user never finished onboarding, ask them to check their bio
  return 9;
}

export default function Onboarding({ user }: { user: User }) {
  console.log("user", user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [formData, setFormData] = useState<SignUpFormData>(
    getInitialSignUpFormData(user)
  );

  // Set current step
  useEffect(() => {
    if (currentStep === null) {
      const onboardingStep = getOnboardingStep(user);
      setCurrentStep(onboardingStep);
    }
  }, [currentStep, setCurrentStep, getOnboardingStep]);

  const steps = [
    {
      component: NameStep,
      validation: validateName,
    },
    {
      component: GenderStep,
      validation: validateGender,
    },
    {
      component: CurrentCityStep,
      validation: validateCity,
    },
    {
      component: ProfilePhotoStep,
      validation: validateProfilePhoto,
    },
    {
      component: BioStep,
      validation: validateBio,
    },
    {
      component: ProfessionalTagsStep,
      validation: validateProfessionalTags,
    },
    {
      component: PersonalTagsStep,
      validation: validatePersonalTags,
    },
    {
      component: FinishUpStep,
      validation: defaultValidator,
    },
  ];

  const numSteps = steps.length;

  const handleNext = async (e: any) => {
    e.preventDefault();
    if (loading || currentStep === null) return;
    setLoading(true);
    const validationError = await steps[currentStep].validation({
      formData,
      setFormData,
    });
    if (validationError !== "") {
      setLoading(false);
      toast.error(validationError);
      return;
    }
    setLoading(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = (e: any) => {
    e.preventDefault();
    if (loading || currentStep === null) return;
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // finish registration
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      firstName: formData.firstName,
      gender: formData.gender,
      currentCity: formData.currentCity,
      bio: formData.bio,
      professionalTags: formData.professionalTags,
      personalTags: formData.personalTags,
    };

    const update = await fetch("/api/user/onboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) {
        const error = await res.text();
        const errorMessage = error
          ? `Error updating user profile: ${error}`
          : "Error updating user profile";
        toast.error(errorMessage);
        return;
      }
      return res.json();
    });
    if (!update) {
      setLoading(false);
      return;
    }

    // Redirect user
    let redirect = searchParams?.get("redirect") || DEFAULT_PAGE;
    if (redirect.startsWith("/onboarding")) {
      redirect = DEFAULT_PAGE;
    }
    setTimeout(() => {
      toast.success(`Signup successful! Redirecting...`);
      router.push(redirect);
      router.refresh();
    }, DEFAULT_WAIT_REDIRECT);
    setTimeout(() => {
      router.refresh();
    }, LONG_WAIT_REDIRECT); // refresh again to make sure the user is logged in
  };
  if (currentStep === null) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col min-h-screen pb-12 w-1/2 mx-auto px-2 sm:px-4 md:px-6 lg:px-12 pt-6 md:pt-12">
      <Progress
        className="mb-6"
        hasStripe
        value={((currentStep + 1) / numSteps) * 100}
      />
      <div>
        {steps[currentStep].component({
          formData,
          setFormData,
          currentStep,
          numSteps,
        })}
      </div>
      <div className="mt-12 flex h-24 flex-col items-center">
        {currentStep < steps.length - 1 &&
          (loading ? (
            <Spinner />
          ) : (
            <Button onClick={handleNext} colorScheme="pink" bg={"pink.300"}>
              Next
            </Button>
          ))}
        {currentStep === steps.length - 1 &&
          (loading ? (
            <Spinner />
          ) : (
            <Button colorScheme="brand" onClick={handleSubmit}>
              Finish
            </Button>
          ))}
        {currentStep > 0 &&
          (loading ? null : (
            <Button onClick={handleBack} variant={"ghost"}>
              Back
            </Button>
          ))}
      </div>
    </div>
  );
}
