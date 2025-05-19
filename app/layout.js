// app/layout.js

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { fredoka, openSans, ttNorms, playlistScript } from "./fonts";
import SessionWrapper from "@/components/SessionWrapper";
import LayoutWrapper from "@/components/LayoutWrapper"; // Client wrapper

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Get me a Chai - Fund your Project",
  description: "Fund your project with a cup of chai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className='antialiased text-white'>
        <SessionWrapper>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
