"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useSession, signOut } from "next-auth/react";
import { UserIcon, PencilSquareIcon, BellIcon } from "@heroicons/react/24/outline";

import SearchModal from "./SearchModal";
import { openSans, playlistScript } from "../app/fonts";

const Navbar = () => {
    const { data: session } = useSession();
    const [showDropdown, setShowdropdown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleBlur = (e) => {
        if (!dropdownRef.current.contains(e.relatedTarget)) {
            setShowdropdown(false);  // Close dropdown if focus moves outside of it
        }
    };

    const handleSignOut = async () => {
        await signOut();
        setShowdropdown(false);
        setIsMenuOpen(false);
    };

    const handleLinkClick = () => {
        setShowdropdown(false);
        setIsMenuOpen(false);
    };

    return (
        <nav className={`bg-[#b5c18e] text-white shadow-[0px_10px_30px_rgba(0,0,0,0.3)] fixed top-0 w-full z-50 ${openSans.className}`}>
            <div className="flex justify-between items-center px-5 md:px-10 py-2 h-16">

                {/* Left - FAQ & About */}
                <div className="hidden md:flex flex-1 gap-3 text-base font-semibold">
                    <Link href="/faq">
                        <button className="py-2 px-6 rounded-full ring-inset ring-[3px] ring-[#55320f] text-[#55320f] hover:bg-[#55320f] hover:text-[#f2f5fe] transition-all">FAQ</button>
                    </Link>
                    <Link href="/about">
                        <button className="py-2 px-5 rounded-full bg-[#eee2d8] text-[#bd783c] hover:bg-[#bd783c] hover:text-[#f2f5fe] transition-all">About</button>
                    </Link>
                </div>

                {/* Center - Logo */}
                <div className={`flex items-center gap-2 pe-2 rounded-full bg-[#eee2d8] ${playlistScript.className} text-xl text-[#321c06]`}>
                    <Link href="/">
                        <CldImage
                            className="min-w-max"
                            width={96}
                            height={96}
                            alt="Chai"
                            style={{
                                height: '2.5rem',
                                minWidth: '2.5rem',
                                width: 'auto',
                            }}
                            src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220240/xidy21xxycirmm0gffwa.png"
                        />
                    </Link>
                    <Link href="/">
                        <span className="px-1 text-nowrap">Have a Chai</span>
                    </Link>
                </div>

                {/* Right - Desktop and Mobile Menu */}
                <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">

                    <div className="hidden md:flex items-center gap-4 text-base font-normal">
                        <SearchModal hidden={true}/>

                        {session ? (
                            <div className="relative">
                                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={() => setShowdropdown(!showDropdown)} onBlur={handleBlur} className={`flex justify-center items-center text-[#625b5b] rounded-full bg-[#f2f5fe] py-2 px-5 `} type="button">
                                    @{session.user.name}
                                    <svg className={`w-2.5 h-2.5 ms-3 transition-transform duration-200 ${showDropdown ? "rotate-180" : "rotate-0"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                <div
                                    ref={dropdownRef}
                                    className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-[#f2f5fe] text-[#625b5b] transition-all duration-200 ease-out transform 
                                        ${showDropdown ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible pointer-events-none"}`}
                                >
                                    <ul className="py-2 text-base font-semibold text-center">
                                        <li className="px-2 py-1">
                                            <Link
                                                href="/dashboard/edit-profile"
                                                onClick={handleLinkClick}
                                                className="flex justify-Start gap-3 px-4 py-2 bg-[#eee2d8] text-[#625b5b] hover:bg-[#deac80] hover:text-[#f2f5fe] rounded-lg"
                                            >
                                                <PencilSquareIcon className="size-6" />
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="px-2 py-1">
                                            <Link
                                                href={`/${session.user.name}`}
                                                onClick={handleLinkClick}
                                                className="flex justify-Start gap-3 px-4 py-2 bg-[#eee2d8] text-[#625b5b] hover:bg-[#deac80] hover:text-[#f2f5fe] rounded-lg"
                                            >
                                                <UserIcon className="size-6" />
                                               My Page
                                            </Link>
                                        </li>
                                        <li className="px-2 py-1">
                                            <Link
                                                href="/dashboard/messages"
                                                onClick={handleLinkClick}
                                                className="flex justify-Start gap-3 px-4 py-2 bg-[#eee2d8] text-[#625b5b] hover:bg-[#deac80] hover:text-[#f2f5fe] rounded-lg"
                                            >
                                                <BellIcon className="size-6" />
                                                Messages
                                            </Link>
                                        </li>
                                        <li className="px-2 py-1">
                                            <Link
                                                href="/login"
                                                onClick={handleSignOut}
                                                className="block px-4 py-2 bg-[#c83f39] text-[#eee2d8] hover:bg-[#deac80] hover:hover:bg-red-700 rounded-full"
                                            >
                                                Sign out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login">
                                <button className="text-[#eee2d8] bg-[#bd783c] hover:bg-[#9c6332] py-2 px-5 rounded-full font-medium transition-all">Login</button>
                            </Link>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button
                        className="md:hidden text-[#55320f] focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden flex flex-col px-5 pb-4 gap-3 text-[#55320f] text-base w-full bg-[#b5c18e] transition-all">
                    <SearchModal />
                    <div className="flex gap-4 bg-[#f2f5fe] p-2 w-full font-semibold rounded-lg ">
                        <Link
                            href="/faq"
                            onClick={handleLinkClick}
                            className="w-1/2"
                        >
                            <button className="px-4 py-2 rounded-lg w-full ring-inset ring-[3px] ring-[#55320f] text-[#55320f] hover:bg-[#55320f] hover:text-[#f2f5fe] transition-all">
                                FAQ
                            </button>
                        </Link>
                        <Link
                            href="/about"
                            onClick={handleLinkClick}
                            className="w-1/2"
                        >
                            <button className="px-4 py-2 rounded-lg w-full ring-inset ring-[3px] ring-[#bd783c] text-[#bd783c] hover:bg-[#bd783c] hover:text-[#f2f5fe] transition-all">
                                About
                            </button>
                        </Link>
                    </div>

                    {session ? (
                        <>
                            <div className="flex flex-col gap-3 p-2 bg-[#f2f5fe] rounded-lg font-semibold">

                                <Link
                                    href="/dashboard/edit-profile"
                                    onClick={handleLinkClick}
                                    className="px-4 py-2 rounded-lg w-full text-center bg-[#eee2d8] text-[#625b5b] hover:bg-[#deac80] hover:text-[#f2f5fe] transition-all"
                                >
                                    <div className="grid grid-cols-6  gap-3 items-center">

                                        <PencilSquareIcon className="size-6 col-span-1" />
                                        <div className="col-span-4 text-center">Dashboard</div>
                                    </div>
                                </Link>
                                <Link
                                    href={`/${session.user.name}`}
                                    onClick={handleLinkClick}
                                    className="px-4 py-2 rounded-lg w-full text-center bg-[#eee2d8] text-[#625b5b] hover:bg-[#deac80] hover:text-[#f2f5fe] transition-all"
                                >
                                    <div className="grid grid-cols-6 gap-3 items-center">

                                        <UserIcon className="size-6 col-span-1" />
                                        <div className="col-span-4 text-center">My Page</div>
                                    </div>
                                </Link>
                                <Link
                                    href="/dashboard/messages"
                                    onClick={handleLinkClick}
                                    className="px-4 py-2 rounded-lg w-full text-center bg-[#eee2d8] text-[#625b5b] hover:bg-[#deac80] hover:text-[#f2f5fe] transition-all"
                                >
                                    <div className="grid grid-cols-6 gap-3 items-center">

                                        <BellIcon className="size-6 col-span-1" />
                                        <div className="col-span-4 text-center">Messages</div>
                                    </div>
                                </Link>
                                <button onClick={handleSignOut} className="bg-[#c83f39] text-[#eee2d8] py-2 px-4 rounded-full w-full transition-all hover:hover:bg-red-700">Sign out</button>
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            onClick={handleLinkClick}

                        >
                            <button className="text-[#eee2d8] bg-[#bd783c] hover:bg-[#9c6332] py-2 px-4 rounded-full w-full transition-all ">Login</button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
