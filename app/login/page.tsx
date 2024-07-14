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
import { emailLogin, signup } from "./actions";
import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabaseClient";
import { createClient } from "@/utils/supabase/server";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PasswordValidityBox from "@/components/atoms/passwordValidityBox";
import { SubmitButton } from "@/components/form/Buttons";
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
import Link from "next/link";
import LoginScreen from "../../components/auth/screens/LoginScreen";
// import { OAuthButtons } from "./oauth-signin";

const passwordCriteria = {
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  specialChar: false,
};

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user from login / page is ", user);

  if (user) {
    console.log("redirecting to /user ");
    return redirect("/user");
  }

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <LoginScreen />
      {/* <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form id="login-form" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                minLength={6}
                name="password"
                id="password"
                type="password"
                required
              />
            </div>
            {searchParams.message && (
              <div className="text-sm font-medium text-destructive">
                {searchParams.message}
              </div>
            )}
            <Button formAction={emailLogin} className="w-full">
              Login
            </Button>
          </form>
          
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <button formAction={signup} form="login-form" className="underline">
              Sign up
            </button>
          </div>
        </CardContent>
      </Card> */}

      {/* <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {" "}
            {isSigningUp ? "Sign up" : "Log in"}
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

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
      </Card> */}
    </section>
  );
}
