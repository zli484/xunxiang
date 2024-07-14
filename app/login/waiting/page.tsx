"use client";
import React from "react";
import Lottie from "lottie-react";
import polite_chicken from "@/public/img/animations/polite_chicken.json";
import { Button } from "@/components/ui/button";

const WaitingScreen: React.FC<any> = ({ onBack }) => {
  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <div className="flex flex-col items-center py-10 px-6">
        <p>Check Your Email</p>
        <div className="flex flex-col items-center w-full space-y-6">
          <div className="w-32">
            <Lottie loop={true} animationData={polite_chicken} />
          </div>
          <p color={"gray.500"}>
            We have sent an email with a confirmation link to your email
            address. Please check your email to complete the sign-up process.
          </p>
          <Button color={"pink-400"} onClick={onBack}>
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WaitingScreen;
