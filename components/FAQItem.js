import React, { useRef } from 'react'

const FAQItem = ({ item, onClick, isOpen }) => {
    const contentRef = useRef(null);

    return (
        <div id={`faq-${item.id}`} className="mb-4 pb-4 bg-[#eeaa94] p-3 rounded-lg">
            <button
                onClick={() => onClick(item.id)}
                className="flex justify-between items-center w-full text-left font-semibold text-base md:text-lg lg:text-xl text-[#55320f]"
            >
                <span>{item.question}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden text-[#4e2d1b] `}
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <p className="mt-2 p-2 bg-[#f2f5fe] rounded-lg font-medium text-sm md:text-base">{item.answer}</p>
            </div>
        </div>
    );
};

export default FAQItem
