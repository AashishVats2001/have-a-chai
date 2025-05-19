import React, { useRef, useEffect, useState } from 'react'
import { fredoka, openSans, ttNorms, playlistScript } from "../app/fonts";
import { CldImage } from 'next-cloudinary';


const MessageItem = ({ id, item, onClick, isOpen }) => {
    const contentRef = useRef(null);
    const [date, setDate] = useState()
    useEffect(() => {
        const date = new Date(item.createdAt).toLocaleDateString()
        setDate(date)
    }, [])


    return (
        <div id={`faq-${id}`} className={`${openSans.className} mb-4 rounded-lg flex flex-col items-end`}>

            <button
                onClick={() => onClick(id)}
                className="flex justify-between items-center w-full text-left font-semibold text-[#282424] bg-[#f2f5fe] p-3 rounded-lg focus:shadow-xl transition-all"
            >
                <div className='flex items-center gap-3 p-2'>
                    <CldImage className='w-12 h-12 hidden sm:block' src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220240/xidy21xxycirmm0gffwa.png' width={100} height={100} alt='Have a Chai logo' />

                    <h1 className='font-normal text-base md:text:lg lg:text-xl'><span className='font-bold'>{item.name} </span>donated <span className='font-medium'>{item.amount / 100 / 100}</span> Chai cups
                    </h1>
                </div>

                <div className='flex flex-col sm:flex-row gap-3 items-center'>
                    <span className='text-xs sm:text-sm md:text-base font-normal text-[#85878b]'> {date}</span>
                    {item.message && (

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    )}
                </div>
            </button>
            {item.message && (

                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden text-[#4e2d1b] w-[95%] me-2 `}
                    ref={contentRef}
                    style={{
                        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
                        opacity: isOpen ? 1 : 0,
                    }}
                >
                    <p className=" p-4 bg-[#b5c18e] rounded-b-lg font-normal text-[#f2f5fe] text-base md:text:lg lg:text-xl">&quot;{item.message}&quot;</p>
                </div>
            )}
        </div>
    )
}

export default MessageItem
