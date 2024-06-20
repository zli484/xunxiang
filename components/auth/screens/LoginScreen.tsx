"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { emailLogin, signup } from "../../../app/login/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PasswordValidityBox from "@/components/atoms/passwordValidityBox";
import { SubmitButton } from "@/components/form/Buttons";
import { Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

const passwordCriteria = {
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  specialChar: false,
};

export default function LoginScreen({}: {}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState({ ...passwordCriteria });
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(true); // State to toggle between sign in and sign up

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

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isSigningUp ? "Sign up" : "Log in"}
          </CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
        </CardHeader>

        <div className=" w-96 p-6">
          <FormContainer action={isSigningUp ? signup : emailLogin}>
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
            <SubmitButton
              text={isSigningUp ? "Sign Up" : "Sign In"}
              className="w-full"
            />
            <Stack spacing={10} my={10}>
              <Flex justify={"center"}>
                <div className="text-center text-sm">
                  {isSigningUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </div>
                <Link
                  href="#"
                  className="text-sm px-1 underline"
                  onClick={() => setIsSigningUp(!isSigningUp)}
                >
                  {isSigningUp ? "Sign in" : "Sign up"}
                </Link>
              </Flex>
            </Stack>
          </FormContainer>
        </div>
      </Card>
    </section>
  );
}
