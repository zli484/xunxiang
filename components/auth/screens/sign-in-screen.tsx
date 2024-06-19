"use client";

import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"; // Import icons for visual indicators
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation"; // Import 'next/router', not 'next/navigation'
import type { Database } from "@/types/database.types";
import login_bg_img from "@/public/img/sign-in/bg_illustration.png";
import Image from "next/image";
import WaitingScreen from "./sign-in-waiting-screen";
import FormContainer from "@/components/form/FormContainer";

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

  const checkMark = <Icon as={AiOutlineCheck} color="green.500" />;
  const closeMark = <Icon as={AiOutlineClose} color="red.500" />;

  const handleSignUp = async () => {
    setLoading(true);

    console.log("signing up clicked");
    console.log("email is", email);
    console.log("password is", password);
    console.log("supabase client is", supabase);
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setLoading(false);

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

    // router.refresh();
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
    return <WaitingScreen onBack={() => setShowWaitingPage(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* <div className="">
        <Image
          src={login_bg_img}
          alt="lara_5"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className=" z-0 mx-auto"
        />
      </div> */}
      <div className=" py-12 px-6 mx-auto space-y-8">
        <form
          className="flex flex-col space-y-8  shadow-lg p-8"
          onSubmit={handleAuth}
        >
          <div className="flex justify-center z-50">
            <p className="text-4xl text-black">
              {isSigningUp
                ? "Sign up for an account"
                : "Sign in to your account"}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-4xl text-black">aaaa</p>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={handlePasswordChange}
                required
              />
              {isSigningUp && showPasswordRequirements && (
                <Stack mt={2} spacing={1}>
                  <Text fontSize="sm">
                    {passwordValid.length ? checkMark : closeMark} At least 8
                    characters
                  </Text>
                  <Text fontSize="sm">
                    {passwordValid.uppercase ? checkMark : closeMark} Contains
                    an uppercase letter
                  </Text>
                  <Text fontSize="sm">
                    {passwordValid.lowercase ? checkMark : closeMark} Contains a
                    lowercase letter
                  </Text>
                  <Text fontSize="sm">
                    {passwordValid.number ? checkMark : closeMark} Contains a
                    number
                  </Text>
                  <Text fontSize="sm">
                    {passwordValid.specialChar ? checkMark : closeMark} Contains
                    a special character (!@#$%^&*)
                  </Text>
                </Stack>
              )}
              <Stack spacing={10} my={10}>
                <Button
                  type="submit"
                  isLoading={loading}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  {isSigningUp ? "Sign up" : "Sign in"}
                </Button>
                <Flex justify={"center"}>
                  <Text mr={2}>
                    {isSigningUp
                      ? "Already have an account?"
                      : "Don't have an account?"}
                  </Text>
                  <Link
                    color={"blue.400"}
                    onClick={() => setIsSigningUp(!isSigningUp)}
                  >
                    {isSigningUp ? "Sign in" : "Sign up"}
                  </Link>
                </Flex>
              </Stack>
            </FormControl>
          </div>
          {error && <Text color="red.500">{error}</Text>}
        </form>
      </div>
    </div>
  );
}
