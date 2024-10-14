import { Toaster } from "@/components/ui/toaster";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "./theme-providers";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <>
      <ClerkProvider>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
}
