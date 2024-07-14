"use client";

import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Checkbox,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation"; // Import 'next/router', not 'next/navigation'
import type { Database } from "@/types/database.types";
import WaitingScreen from "./sign-in-waiting-screen";
import PasswordValidityBox from "../../atoms/passwordValidityBox";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import { signInAction, signUpAction } from "@/utils/actions";

const passwordCriteria = {
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  specialChar: false,
};

export default function SignInScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState({ ...passwordCriteria });
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(true); // State to toggle between sign in and sign up
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWaitingPage, setShowWaitingPage] = useState<boolean>(false);
  const toast = useToast();

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const updatePasswordValidity = (password: string) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#$%^&*]/.test(password);

    setPasswordValid({ length, uppercase, lowercase, number, specialChar });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!showPasswordRequirements) setShowPasswordRequirements(true); // Show requirements when the user starts typing
    updatePasswordValidity(newPassword);
  };

  const handleSignUp = async () => {
    setLoading(true);
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    setShowWaitingPage(true);

    if (error) {
      toast({
        title: "Error signing up.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setShowWaitingPage(true);
    }
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/user");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isSigningUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }

    setLoading(false);
  };

  if (showWaitingPage) {
    console.log("showWaitingPage is true");
    alert("showWaitingPage is true");
    return <WaitingScreen onBack={() => setShowWaitingPage(false)} />;
  }

  return (
    <div className=" py-12 px-6 mx-auto space-y-8">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {" "}
            {isSigningUp ? "Sign up" : "Log in"}
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <FormContainer action={isSigningUp ? signUpAction : signInAction}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            onChange={handlePasswordChange}
          />
          {isSigningUp && showPasswordRequirements && (
            <PasswordValidityBox passwordValid={passwordValid} />
          )}
          <SubmitButton text={isSigningUp ? "Sign Up" : "Sign In"} />
          <Stack spacing={10} my={10}>
            <Flex justify={"center"}>
              <Text mr={2}>
                {isSigningUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Text>
              <Link
                href="#"
                color={"blue.400"}
                onClick={() => setIsSigningUp(!isSigningUp)}
              >
                {isSigningUp ? "Sign in" : "Sign up"}
              </Link>
            </Flex>
          </Stack>
        </FormContainer>

        {/* <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl> */}
        <FormControl id="password">
          {/* <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            // onChange={(e) => setPassword(e.target.value)}
            onChange={handlePasswordChange}
            required
          /> */}
          {/* {isSigningUp && showPasswordRequirements && (
            <PasswordValidityBox passwordValid={passwordValid} />
          )} */}
          {/* <Stack spacing={10} my={10}>
            <Flex justify={"center"}>
              <Text mr={2}>
                {isSigningUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Text>
              <Link
                href="#"
                color={"blue.400"}
                onClick={() => setIsSigningUp(!isSigningUp)}
              >
                {isSigningUp ? "Sign in" : "Sign up"}
              </Link>
            </Flex>
          </Stack> */}
        </FormControl>
      </Card>
      {error && <Text color="red.500">{error}</Text>}
    </div>
  );
}
// <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
{
  /* <div className="">
        <Image
          src={login_bg_img}
          alt="lara_5"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className=" z-0 mx-auto"
        />
      </div> */
}

{
  /* <form
className="flex flex-col space-y-8  shadow-lg p-8"
onSubmit={handleAuth}
> */
}
