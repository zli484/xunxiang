// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import { fonts } from "./fonts";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import { Lato } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ subsets: ["latin"], weight: "400" });

export const theme = extendTheme({
  // fonts: {
  //   body: "Inter, sans-serif",
  //   heading: "Inter, sans-serif",
  //   mono: "Menlo, monospace",
  // },
  //   fonts: {
  //     heading: lato.style.fontFamily,
  //     body: lato.style.fontFamily,
  //   },
  fonts: {
    heading: lato.style.fontFamily,
    body: lato.style.fontFamily,
  },
  colors: {
    brand: {
      50: "#ec4899",
      500: "#ec4899",
      900: "#500724",
    },
  },
});
