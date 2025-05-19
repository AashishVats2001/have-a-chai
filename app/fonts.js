import { Fredoka, Work_Sans } from "next/font/google"
import localFont from "next/font/local";

export const ttNorms = localFont({
    src: [
      {
        path: "./fonts/TTNorms/TTNorms-Thin.woff2",
        weight: "100",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-ThinItalic.woff2",
        weight: "100",
        style: "italic",
      },
      {
        path: "./fonts/TTNorms/TTNorms-ExtraLight.woff2",
        weight: "200",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-ExtraLightItalic.woff2",
        weight: "200",
        style: "italic",
      },
      {
        path: "./fonts/TTNorms/TTNorms-Light.woff2",
        weight: "300",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-LightItalic.woff2",
        weight: "300",
        style: "italic",
      },
      {
        path: "./fonts/TTNorms/TTNorms-Regular.woff2",
        weight: "400",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-Italic.woff2",
        weight: "400",
        style: "italic",
      },
      {
        path: "./fonts/TTNorms/TTNorms-Medium.woff2",
        weight: "500",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-MediumItalic.woff2",
        weight: "500",
        style: "italic",
      },
      {
        path: "./fonts/TTNorms/TTNorms-Bold.woff2",
        weight: "700",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-BoldItalic.woff2",
        weight: "700",
        style: "italic",
      },
      {
        path: "./fonts/TTNorms/TTNorms-ExtraBold.woff2",
        weight: "800",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-ExtraBoldItalic.woff2",
        weight: "800",
        style: "italic",
      },
      {
        path: "./fonts/TTNorms/TTNorms-Black.woff2",
        weight: "900",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-BlackItalic.woff2",
        weight: "900",
        style: "italic",
      },
      {
        path: "./fonts/TTNorms/TTNorms-Heavy.woff2",
        weight: "900",
        style: "normal",
      },
      {
        path: "./fonts/TTNorms/TTNorms-HeavyItalic.woff2",
        weight: "900",
        style: "italic",
      },
    ],
    variable: "--font-ttnorms",
    display: "swap",
  });
export const playlistScript = localFont({
    src: './fonts/Playlist-Script.woff'
})

export const fredoka = Fredoka({
    variable: "--font-fredoka",
    subsets: ["latin"]
})

export const openSans = Work_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"]
})