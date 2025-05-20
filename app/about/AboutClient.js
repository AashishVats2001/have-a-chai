"use client";

import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { fredoka, openSans } from "../fonts.js";


const AboutClient = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Decorative Images */}
            <div className="absolute pt-24 text-black font-semibold z-10 w-full h-[35%]">
                <CldImage
                    className="absolute  top-[25%]"
                    src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220348/true4qke1zbc1w1wvmuh.png"
                    alt="petal"
                    width={1080}
                    height={1080}
                    style={{
                        maxWidth: '18%',
                        height: 'auto',
                    }}
                />
                <CldImage
                    className="absolute right-[3%] top-[25%]"
                    src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220349/szgwgptxrasqmg8bkxqb.png"
                    alt="Book"
                    width={1080}
                    height={1080}
                    style={{
                        maxWidth: '20%',
                        height: 'auto',
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-5 flex flex-col items-center px-6 md:px-0 py-32">
                <h1 className={`text-5xl md:text-7xl font-bold text-[#4e2d1b] ${fredoka.className} mb-4`}>
                    My Story
                </h1>
                <p className={`${openSans.className} text-[#bd783c] text-base md:text-lg font-semibold mb-8 text-center`}>
                    Aashish Vats | Front-End React Developer
                </p>

                <div className="w-full md:w-[70%] rounded-xl bg-[#eeaa94] text-[#f2f5fe] text-sm md:text-base shadow-xl">
                    <div className={`flex flex-col gap-6 px-6 md:px-14 py-10 ${openSans.className}`}>
                        <h2 className="text-3xl md:text-5xl font-bold">Hi!</h2>
                        <p>
                            I&apos;m <span className="p-1 bg-[#ff914d] rounded-md">Aashish Vats,</span> a front-end developer specializing in <span className="p-1 bg-[#516fb7] rounded-md">React.js.</span> With a strong foundation in web development, I have built several projects that emphasize user-friendly design, efficiency, and interactivity.
                        </p>
                        <p>
                            My journey in web development has been a blend of <span className="p-1 bg-[#55320f] rounded-md">creativity, code, and problem-solving.</span> With a background in Computer Applications, I&apos;ve built this platform to empower creators by simplifying how they receive support.
                        </p>
                        <p>
                            Welcome to <span className="p-1 bg-[#99ab61] rounded-md">HaveAChai,</span> a platform that I designed and developed to enable creators like you to connect with your audience in a more meaningful way. Whether you&apos;re an artist, developer, writer, or any creator, this platform allows your fans to support you with a simple and thoughtful gesture – <span className="p-1 bg-[#99ab61] rounded-md">a cup of chai.</span>
                        </p>
                        <p>
                            HaveAChai is inspired by the concept of community-driven platforms like
                            <span className="p-1 bg-[#ffde59] text-[#282424] rounded-md underline underline-offset-2">
                                <a href="https://buymeacoffee.com" target='_blank'>BuyMeACoffee.com</a>
                            </span>
                            My goal is to make it easy for creators to sustain their work, with chai as a symbol of warmth, comfort, and appreciation.
                        </p>
                    </div>
                </div>

                <h3 className={`${openSans.className} text-xl md:text-3xl font-bold text-[#bd783c] mt-12 text-center`}>
                    Feel free to explore my work and contact me
                </h3>

                {/* Contact Links */}
                <div className="flex justify-center items-end gap-6 mt-6">
                    <Link href="https://www.linkedin.com/in/aashish-vats-dev/" target="_blank">
                        <CldImage
                            src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220313/qccjnqounhtp0uqqtzde.png"
                            alt="LinkedIn"
                            width={60}
                            height={60}
                        />
                    </Link>
                    <Link href="https://profile.indeed.com/p/aashishv-x2j8tvk" target="_blank" className="">
                        <CldImage
                            src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220312/dr8vunujvpoe9cpwnem2.png"
                            alt="Indeed"
                            width={60}
                            height={60}
                        />
                    </Link>
                    <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=aashishv2323@gmail.com" target="_blank" className="translate-y-[5px]">
                        <CldImage
                            src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220313/kse3cpkvby3qvhf2r1ca.png"
                            alt="Gmail"
                            width={60}
                            height={60}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutClient;
