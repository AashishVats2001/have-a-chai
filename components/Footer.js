'use client'

import React, { useEffect, useState } from 'react'
import { openSans } from "../app/fonts";
import Link from 'next/link'
import { CldImage } from 'next-cloudinary';



const Footer = () => {
  const [year, setYear] = useState(2025)
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    setYear(year)
  }, [])

  return (
    <footer className={`bg-[#b5c18e] py-4 flex flex-col justify-center gap-4 items-center text-[#282424] ${openSans.className} w-full gap-2 z-40 shadow-[0px_-10px_40px_rgba(0,0,0,0.3)]`}>
      <div className='flex flex-col md:flex-row w-11/12 justify-evenly rounded-lg bg-[#eee2d8] py-4 items-center gap-1 md:gap-4 font-semibold text-base lg:text-lg xl:text-xl '>

        <Link href={'/about'} className='p-3 w-3/12 md:w-1/12 text-center hover:bg-[#bd783c] hover:text-[#f2f5fe] rounded-lg'>About</Link>
        <div className="border-[#bd783c] border w-9/12 md:hidden block"></div>

        <Link href={'/faq'} className='p-3 w-3/12 md:w-1/12 text-center hover:bg-[#bd783c] hover:text-[#f2f5fe] rounded-lg'>FAQ</Link>
        <div className="border-[#bd783c] border w-9/12 md:hidden block"></div>

        <Link href={'/login'} className='p-3 w-3/12 md:w-1/12 text-center hover:bg-[#bd783c] hover:text-[#f2f5fe] rounded-lg'>Login</Link>
        <div className="border-[#bd783c] border w-9/12 md:hidden block"></div>

        <Link href={'/login'} className='p-3 w-3/12 md:w-1/12 text-center hover:bg-[#bd783c] hover:text-[#f2f5fe] rounded-lg'>Signup</Link>
        <div className="border-[#bd783c] border w-9/12 md:hidden block"></div>

        <div className='flex w-3/12 md:w-1/12 text-center justify-center gap-6 md:gap-4 items-center mt-2 md:mt-0'>
          <Link href={'https://www.linkedin.com/in/aashish-vats-dev/'} target='_blank'>
            <CldImage
              className='min-w-7'
              src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220313/qccjnqounhtp0uqqtzde.png'
              alt='linkedin'
              width={30}
              height={30}
              priority={true}
            />
          </Link>
          <Link href={'https://profile.indeed.com/p/aashishv-x2j8tvk'} target='_blank'>
            <CldImage
              className='min-w-7'
              src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220312/dr8vunujvpoe9cpwnem2.png'
              alt='indeed'
              width={30}
              height={30}
              priority={true}
            />
          </Link>
          <Link href={'https://mail.google.com/mail/?view=cm&fs=1&to=aashishv2323@gmail.com'} target='_blank'>
            <CldImage
              className='min-w-7 mt-1'
              src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220313/kse3cpkvby3qvhf2r1ca.png'
              alt='Gmail'
              width={30}
              height={30}
              priority={true}
            />
          </Link>

        </div>
      </div>
      <div className={`text-[#f2f5fe] flex flex-col md:flex-row gap-2 justify-around items-center w-full font-normal mb-2 text-sm md:text-md`}>
        <div>
          Copyright &copy; {year}
        </div>
        <div>
          <span className="font-medium"><Link href={'/'}>Have A Chai</Link></span> | All Rights Reserved
        </div>
        <div>
          Made with ❤️ by <span className="font-medium">Aashish Vats</span>
        </div>
      </div>
    </footer>



  )
}

export default Footer
