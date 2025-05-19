import React from 'react'
import FAQList from '@/components/FAQList'
import { fredoka } from "../fonts.js";


const Faq = () => {
  return (
    <div>
      {/* Background question marks */}
      <div className={`absolute pt-32 text-black font-semibold ${fredoka.className} h-[35%] w-[100%] z-10`}>
        <h1 className='absolute left-[10%] text-5xl md:text-6xl lg:text-8xl xl:text-9xl scale-[2] rotate-45 text-[#deac80]'>?</h1>
        <h1 className='absolute left-[45%] bottom-14 md:bottom-20 lg:bottom-10 text-7xl md:text-8xl -rotate-12 text-[#b7ccff] font-medium'>?</h1>
        <h1 className='absolute right-[20%] text-5xl md:text-7xl lg:text-8xl xl:text-9xl scale-[3] -rotate-[17deg] text-[#f96d8d]'>?</h1>
      </div>

      {/* Foreground content */}
      <div className='flex flex-col items-center z-20 relative'>
        <div className='mt-32 mb-10'>
          <h1 className={`text-5xl lg:text-7xl text-center font-bold text-[#4e2d1b] ${fredoka.className} px-3 z-20 relative`}>
            Frequently Asked Questions
          </h1>
        </div>
        <div className="w-full">
          <FAQList />
        </div>
      </div>

    </div>
  )
}

export default Faq