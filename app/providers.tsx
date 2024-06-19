"use client";

import { Toaster } from "@/components/ui/toaster";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "./theme-providers";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
