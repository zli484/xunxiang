"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </NextThemesProvider>
  );
}
