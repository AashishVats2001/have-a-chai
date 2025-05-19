'use client'

import Link from "next/link";
import { fredoka, openSans, ttNorms, playlistScript } from "./fonts";
import { CldImage } from "next-cloudinary";
import SearchModal from "@/components/SearchModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">


      {/* Have A Chai Section */}
      <div className="flex justify-around items-center gap-11 w-11/12 mt-20 h-[calc(100vh-80px)]">
        <div className="text-black flex flex-col gap-5 justify-center items-center text-center lg:text-start lg:items-start">

          <p className="text-[#5a6635] font-semibold text-sm sm:text-md ">⭐⭐⭐⭐⭐ Loved by 1,000,000+ creators</p>

          <div className="text-[#4e2d1b] z-20 text-4xl sm:text-6xl md:text-7xl xl:text-8xl transition-all">
            <h1 className={`font-bold ${openSans.className}`}>Have a <span className={`text-[#bd783c] ${playlistScript.className} font-normal`}>Chai!</span></h1>
            <h1 className="font-bold">Fund your <span className="text-[#5a6635]">Passion</span></h1>
          </div>

          <p className="font-medium z-20 text-[#55320f] sm:text-xl ">&ldquo;A simple way to support creators by buying them a cup of chai.&rdquo;</p>

          <Link href={"/login"} className="z-20">
            <button className="ring-2 ring-[#bd783c] bg-[#eee2d8] hover:bg-[#bd783c] py-2 px-6 z-20 rounded-full font-semibold shadow-xl text-md transition-all text-[#bd783c] hover:text-[#eee2d8]">Let&apos;s Get Started</button>
          </Link>

          <p className="font-normal z-20 text-[#55320f] text-sm sm:text-md ">Accept support from your audience. Setup within minutes.</p>

          {/* Decorative Hearts in the background */}
          <CldImage
            className="z-10 absolute sm:ms-28 lg:ms-0 translate-y-[20%] lg:translate-y-[50%]"
            width={384}
            height={384}
            style={{
              width: '20%',
              minWidth: '150px',
              maxWidth: '350px',
              height: 'auto'
            }}
            alt="Hearts"
            src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220370/oze7jwwgkx4umenoj3qc.png'
          />
        </div>

        {/* Chai Bisuit Images Visible after lg: */}
        <div className="relative w-3/4 xl:w-1/2 -translate-y-20 hidden lg:block transition-all">

          <CldImage
            className="absolute z-10"
            width={1080}
            height={1080}
            style={{
              width: '45%',
              minWidth: '250px',
              height: 'auto'
            }}
            alt="Chai in a cup"
            src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220378/n1osadzrvcgb722zgvm9.gif'
          />
          <div className="relative h-full ">

            <CldImage
              className="absolute z-0 -translate-y-[40%] translate-x-[5%] transition-all"
              width={1080}
              height={1080}
              style={{
                width: '50%',
                minWidth: '290px',
                height: 'auto'
              }}
              alt="Chai in a glass"
              src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220374/nvhcqfr0ycqnp97wptmm.gif'
            />


            <CldImage
              className="absolute z-20 -translate-y-[10%] translate-x-[80%] transition-all"
              width={1296}
              height={1296}
              style={{
                width: '50%',
                minWidth: '250px',
                height: 'auto'
              }}
              alt="biscuit-container"
              src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220379/nm1yvfsnnvvfqxgjmxvg.gif'
            />
          </div>

        </div>

      </div>

      {/* Dividing Line Invisble after xl:*/}
      <div className="block xl:hidden border border-[#4e2d1b]/30 w-10/12 md:w-8/12 mt-4 mb-10"></div>

      {/* 'For Creators's section */}
      <div className="flex flex-col gap-10 mb-10 items-center xl:items-start w-11/12">

        <h1 className={`text-[#4e2d1b] text-5xl text-center md:text-7xl lg:text-8xl font-black z-20 ${fredoka.className}`}>
          For Creators
        </h1>

        <div className="flex flex-col-reverse xl:flex-row w-full gap-6 xl:gap-10">

          {/* Creator Image */}
          <div className="relative w-full xl:w-[35%] h-[400px] xl:h-auto">
            <div className="absolute inset-0 z-10 xl:translate-x-[-10%]">
              <CldImage
                className="object-cover overflow-visible w-full h-full overflow-y-hidden xl:overflow-y-visible xl:scale-125"
                fill
                alt="Curvy Lines"
                src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220369/z2dietv8oztt5xffboqn.png"
              />
            </div>
            <div className="relative z-20 flex justify-center items-center h-full">
              <CldImage
                className="h-auto w-[60%] md:w-auto"
                width={400}
                height={400}
                alt="Creators"
                src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220368/d89vh8oyjprjuvjqx1ki.png"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col justify-between items-center bg-[#deac80] w-full xl:w-[65%] rounded-xl shadow-xl z-20">
            <div className="flex items-center mt-10 mx-4 rounded-full bg-[#eee2d8] gap-3">
              <h1 className={`font-bold text-xl sm:text-2xl md:text-4xl p-2 md:p-4 text-center text-[#55320f] ${openSans.className}`}>
                Start Earning with a Chai
              </h1>
              <CldImage
                className=""
                width={70}
                height={70}
                alt="Have a Chai Logo"
                src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220240/xidy21xxycirmm0gffwa.png"
              />
            </div>

            <div className="w-full flex justify-center  my-7">
              <div className={`flex flex-col gap-4 w-11/12 items-center font-medium ${openSans.className} bg-[#eee2d8] rounded-lg p-4 text-base md:text-lg lg:text-xl`}>

                <div className="flex flex-col gap-4 leading-6 md:leading-7 text-center md:text-start">
                  <p className="text-[#cf8c51] ">
                    <span className="bg-[#ff914d] text-[#f2f5fe] px-1 rounded">Share your passion</span> and let your supporters fuel your journey. Whether you&apos;re a <span className="bg-[#ff914d] text-[#f2f5fe] px-1 rounded">Writer, Musician, Developer, or Artist,</span> HaveAChai is here to help you turn appreciation into something tangible.
                  </p>
                  <p className="text-[#cf8c51]">
                    <span className="bg-[#ff914d] text-[#f2f5fe] px-1 rounded">Create</span> your profile, <span className="bg-[#ff914d] text-[#f2f5fe] px-1 rounded">Set</span> your goals, and <span className="bg-[#ff914d] text-[#f2f5fe] px-1 rounded">Receive</span> chai contributions from your audience.
                  </p>
                  <p className="text-[#cf8c51]">
                    It will take minutes to setup your profile and create an interface between <span className="bg-[#ff914d] text-[#f2f5fe] px-1 rounded">You and your audience.</span>
                  </p>
                </div>

                <Link href="/login" className="mt-5">
                  <button className={`bg-[#55320f] hover:bg-[#eee2d8] hover:ring-2 hover:ring-[#55320f] py-2 px-6 rounded-full text-base md:text-lg lg:text-xl shadow-xl font-medium text-[#eee2d8] hover:text-[#55320f] transition-all ${openSans.className}`}>
                    Start my page
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dividing Line Invisble after xl:*/}
      <div className="block xl:hidden border border-[#4e2d1b]/30 w-10/12 md:w-8/12 mb-10"></div>

      {/* 'For Supporters's section */}
      <div className="flex flex-col gap-10 mb-10 items-center xl:items-start w-11/12">

        <h1 className={`text-[#4e2d1b] text-center xl:text-end w-full text-5xl md:text-7xl lg:text-8xl font-black z-20 ${fredoka.className}`}>
          For Supporters
        </h1>

        <div className="flex flex-col-reverse xl:flex-row-reverse w-full gap-6 xl:gap-10">

          {/* Supporters Image */}
          <div className="relative w-full xl:w-[35%] h-[400px] xl:h-auto">
            <div className="absolute inset-0 z-10 xl:translate-x-[10%]">
              <CldImage
                className="object-cover overflow-visible w-full h-full overflow-y-hidden xl:overflow-y-visible xl:scale-125 rotate-180"
                fill
                alt="Curvey Lines"
                src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220369/z2dietv8oztt5xffboqn.png'
              />
            </div>
            <div className="relative z-20 flex justify-center items-center h-full">
              <CldImage
                className="h-auto w-[60%] md:w-auto"
                width={400}
                height={400}
                alt="Supporters"
                src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220377/m3gllfdxoptmkiiybrs5.png'
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col justify-between items-center bg-[#deac80] w-full xl:w-[65%] rounded-xl shadow-xl z-20">
            <div className="flex items-center mt-10 mx-4 rounded-full bg-[#eee2d8] gap-3">
              <h1 className={`font-bold text-xl sm:text-2xl md:text-4xl p-2 md:p-4 text-center text-[#55320f] ${openSans.className}`}>
                Support Creators You Love
              </h1>
              <CldImage
                className=""
                width={70}
                height={70}
                alt="Love"
                src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220371/jiqe5vf5lmkm5lguvqnx.png'
              />
            </div>

            <div className="w-full flex justify-center my-7">
              <div className={`flex flex-col gap-4 w-11/12 items-center font-medium text-[#cf8c51] ${openSans.className} bg-[#eee2d8] rounded-lg p-4 text-base md:text-lg lg:text-xl`}>

                <div className="flex flex-col gap-4 leading-6 md:leading-7 text-center md:text-start">
                  <p className="font-semibold">A Chai is more than just a drink:</p>
                  <p>It&apos;s a small token of appreciation, a way to say <span className="bg-[#f96d8d] text-[#f2f5fe] px-1 rounded">Thank You</span> to the creators who bring value to your life — through their art, code, music, writing, or humor.</p>
                  <p>By offering a chai, you’re helping them stay <span className="bg-[#f96d8d] text-[#f2f5fe] px-1 rounded">motivated,</span> keep <span className="bg-[#f96d8d] text-[#f2f5fe] px-1 rounded">creating</span> and <span className="bg-[#f96d8d] text-[#f2f5fe] px-1 rounded">chase their dreams</span> with more freedom and less worry.</p>
                  <p><span className="bg-[#f96d8d] text-[#f2f5fe] px-1 rounded">Show your support</span> — whether it&apos;s a one-time gesture or a recurring chai — and be a part of their creative journey.</p>
                  <p className="">Because even the smallest contribution can make a big difference in the life of a passionate creator.</p>
                </div>

                  <SearchModal hidden={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dividing Line Invisble after xl:*/}
      <div className="block xl:hidden border border-[#4e2d1b]/30 w-10/12 md:w-8/12 mb-10"></div>

      {/* 'How It Works' section */}
      <div className="flex flex-col justify-center items-center w-full mb-32">

        <h1 className={`text-[#4e2d1b] text-5xl md:text-7xl lg:text-8xl text-center font-black z-10 mb-10 ${fredoka.className}`}>How It Works</h1>

        <div className="bg-[#deac80] w-11/12 h-full p-10 rounded-xl shadow-[0_10px_10px_rgba(0,0,0,0.33)]">
          <div className={`bg-[#f7dcb9] p-10 rounded-xl flex flex-col lg:flex-row justify-evenly items-stretch text-black text-center gap-2 ${openSans.className}`}>

            {/* Step 1 */}

            <div className="flex flex-col items-center justify-between gap-0">
              <h1 className="text-2xl md:text-3xl font-bold text-[#55320f]">Step 1:</h1>
              <h1 className={`text-lg md:text-2xl font-medium text-[#f2f5fe] bg-[#99ab61] rounded-md px-2 mt-5 z-10`}>Find your favourite creator</h1>
              <CldImage
                className="-mt-10"
                width={250}
                height={250}
                alt="Finding Creator"
                src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220372/tl9t24zzqvyimo8qhjsq.png'
              />
              <p className={`text-[#bd783c] font-bold text-lg md:text-xl ${ttNorms.className}`}>Browse through a variety of creators and find someone who inspires you.</p>
            </div>

            <div className="border-[#bd783c] border"></div>

            {/* Step 2 */}

            <div className="flex flex-col items-center justify-between gap-0">
              <h1 className="text-2xl md:text-3xl font-bold text-[#55320f]">Step 2:</h1>
              <h1 className={`text-lg md:text-2xl font-medium text-[#f2f5fe] bg-[#99ab61] rounded-md px-2 mt-5 z-10 ${ttNorms.className}`}>Buy them a cup of chai</h1>
              <CldImage
                className="-mt-10"
                width={250}
                height={250}
                alt="Chai Cup"
                src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220367/kviwpxgavyuyso1kgnj1.png'
              />
              <p className={`text-[#bd783c] font-bold text-lg md:text-xl ${ttNorms.className}`}>With just a few clicks, show your appreciation by buying a chai.</p>
            </div>

            <div className="border-[#bd783c] border"></div>

            {/* Step 3 */}

            <div className="flex flex-col items-center justify-between gap-0">
              <h1 className="text-2xl md:text-3xl font-bold text-[#55320f]">Step 3:</h1>
              <h1 className={`text-lg md:text-2xl font-medium text-[#f2f5fe] bg-[#99ab61] rounded-md px-2 mt-5 z-10 ${ttNorms.className}`}>Support their journey</h1>
              <CldImage
                className="-mt-10"
                width={250}
                height={250}
                alt="Hearts"
                src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220373/iachtygw4krmqq5wktzx.png'
              />
              <p className={`text-[#bd783c] font-bold text-lg md:text-xl ${ttNorms.className}`}>Your support helps them continue creating awesome content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
