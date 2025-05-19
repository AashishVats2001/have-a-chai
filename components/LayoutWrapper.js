"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f7dcb9] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
