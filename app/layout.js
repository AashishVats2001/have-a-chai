import "./globals.css";
import { openSans } from "./fonts";
import SessionWrapper from "@/components/SessionWrapper";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Have A Chai",
  description: "Fund your project with a cup of chai",
  icons: {
    icon: '/favicon.ico',
  },
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
