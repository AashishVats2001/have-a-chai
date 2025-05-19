"use client"
import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

import { openSans, playlistScript } from "../fonts.js";
import { CldImage } from 'next-cloudinary'




const Login = () => {
    const { data: session } = useSession()
    const router = useRouter();
    useEffect(() => {
        if (session) {
            router.push('/dashboard')
        }
    }, [session, router])


    return (
        <div className='bg-[#f2f5fe] flex overflow-hidden'>

            {/* Background Curvey Lines */}

            <div className='absolute hidden md:block z-10 -translate-x-[15%] -translate-y-[15%] overflow-hidden pointer-events-none'>
                <CldImage
                    className="w-[1080px] h-auto overflow-hidden"
                    src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220344/wxdkrlvrrltzapcwmzsj.png"
                    width={1080}
                    height={1080}
                    alt='Circular Curvey Lines'
                    priority
                />
            </div>

            {/* Frontground Content */}
            <div className='flex flex-col md:flex-row z-10 md:ms-10 w-full'>

                {/* Left Side */}
                <div className='hidden md:flex md:flex-col h-[91.5vh] min-h-[760px] text-center items-center justify-evenly w-1/2 '>
                    <div className='flex flex-col items-center justify-center gap-10'>
                        <CldImage
                            src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220240/xidy21xxycirmm0gffwa.png"
                            width={640}
                            height={640}
                            style={{
                                width: '15vw',
                                maxWidth: '440px',
                                minWidth: '180px',
                                height: 'auto'
                            }}
                            alt='Chai Logo'
                        />

                        <h1 className={` ${playlistScript.className} text-[#321c06] text-4xl md:text-5xl lg:text-6xl`}>Have a Chai</h1>

                        <p className={`text-[#55320f] md:text-lg lg:text-xl xl:text-2xl font-semibold`}>&quot;Fuel creativity, one chai at a time.&quot;</p>
                    </div>

                    <h1 className={`${openSans.className} text-[#5a6635] lg:text-lg font-semibold`}>Loved by 1,000,000+ creators</h1>
                </div>


                {/* Right Side */}
                <div className={`${openSans.className} text-[#4e2d1b] bg-[#f7dcb9] md:rounded-2xl md:shadow-[-7px_7px_15px_0_rgba(0,0,0,0.25)] items-center flex w-full h-screen min-h-[700px] md:h-[80vh]`}>
                    <div className='flex flex-col justify-center items-center gap-2 md:gap-4 lg:gap-6 xl:gap-8 w-full'>

                        <h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6'>Welcome</h1>
                        <hr className='bg-[#4e2d1b]/50 h-[3px] w-[65%]' />
                        <h1 className='text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold'>Login with</h1>
                        <hr className='bg-[#4e2d1b]/50 h-[3px] w-[30%]' />


                        {/* Buttons */}
                        <div className="flex flex-col gap-5 max-w-[70%] w-full justify-center mt-10">

                            {/* Google Button */}
                            <button
                                onClick={() => signIn('google')}
                                className="grid grid-cols-6 items-center justify-around p-3 bg-[#f2f5fe] rounded-xl shadow-xs transition-all duration-200 hover:shadow-md"
                            >
                                <CldImage
                                    src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220328/tillwxb0qjck4bsqjl8m.png"
                                    width={40}
                                    height={40}
                                    alt="Google Logo"
                                    className='col-start-2 max-w-10 w-[80%] max-h-10'
                                />

                                <div className="h-8 w-px bg-[#c4c4c4] mx-4" />

                                <span className={`${openSans.className} block sm:hidden col-start-4 col-end-7 text-start text-[#55320f] font-semibold text-base md:text-lg lg:text-xl `}>
                                    Google
                                </span>

                                <span className={`${openSans.className} hidden sm:block col-start-4 col-end-7 text-start text-[#55320f] font-semibold text-lg lg:text-xl `}>
                                    Continue with Google
                                </span>
                            </button>

                            {/* Facebook Button */}
                            <button
                                onClick={() => signIn('facebook')}
                                className="grid grid-cols-6 items-center justify-around p-3 bg-[#f2f5fe] rounded-xl shadow-xs transition-all duration-200 hover:shadow-md"
                            >
                                <CldImage
                                    src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220327/o30ix4etkfhfzuvheje2.png"
                                    width={40}
                                    height={40}
                                    alt="Facebook Logo"
                                    className='col-start-2 max-w-10 w-[80%] max-h-10'
                                />

                                <div className="h-8 w-px bg-[#c4c4c4] mx-4" />

                                <span className={`${openSans.className} block sm:hidden col-start-4 col-end-7 text-start text-[#55320f] font-semibold text-base md:text-lg lg:text-xl `}>
                                    Facebook
                                </span>

                                <span className={`${openSans.className} hidden sm:block col-start-4 col-end-7 text-start text-[#55320f] font-semibold text-lg lg:text-xl `}>
                                    Continue with Facebook
                                </span>
                            </button>

                            {/* GitHub Button */}
                            <button
                                onClick={() => signIn('github')}
                                className="grid grid-cols-6 items-center justify-around p-3 bg-[#f2f5fe] rounded-xl shadow-xs transition-all duration-200 hover:shadow-md"
                            >
                                <CldImage
                                    src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220327/i9dqufxtpf6shxiqmjoh.png"
                                    width={40}
                                    height={40}
                                    alt="GitHub Logo"
                                    className='col-start-2 max-w-10 w-[80%] max-h-10'
                                />

                                <div className="h-8 w-px bg-[#c4c4c4] mx-4" />

                                <span className={`${openSans.className} block sm:hidden col-start-4 col-end-7 text-start text-[#55320f] font-semibold text-base md:text-lg lg:text-xl `}>
                                    GitHub
                                </span>

                                <span className={`${openSans.className} hidden sm:block col-start-4 col-end-7 text-start text-[#55320f] font-semibold text-lg lg:text-xl `}>
                                    Continue with GitHub
                                </span>
                            </button>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login









