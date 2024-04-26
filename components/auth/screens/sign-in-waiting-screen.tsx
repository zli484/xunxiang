// WaitingPage.tsx
import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Lottie from "lottie-react";
import polite_chicken from "@/public/img/animations/polite_chicken.json";

interface WaitingScreenProps {
  onBack: () => void; // Function that doesn't return anything
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center py-10 px-6">
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Check Your Email
      </Heading>
      <div className="flex justify-center w-32">
        <Lottie loop={true} animationData={polite_chicken} />
      </div>
      <Text color={"gray.500"}>
        We have sent an email with a confirmation link to your email address.
        Please check your email to complete the sign-up process.
      </Text>
      <Button color={"pink-400"} mt="24px" onClick={onBack}>
        Go Back
      </Button>
    </div>
  );
};

export default WaitingScreen;
