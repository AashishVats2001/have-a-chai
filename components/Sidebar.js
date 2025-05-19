"use client"

import Link from 'next/link'
import React from 'react'
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation";
import { fredoka, openSans, ttNorms, playlistScript } from "../app/fonts";

const Sidebar = () => {
    const pathname = usePathname();

    const editProfile = pathname.startsWith("/dashboard/edit-profile");
    const messages = pathname.startsWith("/dashboard/messages");

    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <div className='w-full h-full flex flex-col gap-6 text-[#282424] justify-between'>

            {/* Navigation Links */}
            <nav className={`flex flex-col gap-4 text-base lg:text-lg ${openSans.className} `}>
                <Link href="/dashboard/edit-profile" className={`${editProfile ? "bg-[#f2f5fe] shadow-xl" : "bg-none shadow-none"} transition-all duration-300  flex w-full p-2 px-4 gap-2 items-center rounded-lg hover:text-[#bd783c] `}>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>

                    <h1>Dashboard</h1>
                </Link>
                <Link href="/dashboard/messages" className={`${messages ? "bg-[#f2f5fe] shadow-xl" : "bg-none shadow-none"} transition-all duration-300  flex w-full p-2 px-4 gap-2 items-center rounded-lg hover:text-[#bd783c] `}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clipRule="evenodd" />
                    </svg>

                    <h1>Messages/Payments</h1>
                </Link>
            </nav>

            {/* Logout */}

            <button
                onClick={handleSignOut}
                className={`bg-[#c83f39] text-white py-2 px-4 text-sm lg:text-base rounded-full w-full ${openSans.className} font-medium hover:bg-red-700 transition`}
            >
                Logout
            </button>
        </div>
    )
}

export default Sidebar
