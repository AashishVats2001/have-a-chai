'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import * as motion from "motion/react-client"
import { CldImage } from 'next-cloudinary';



export default function SearchModal({hidden}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef();
    const modalRef = useRef();

    // Debounce logic
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                handleSearch(query);
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(timeoutId); // Cleanup on query change
    }, [query]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen])


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSearch = async (query) => {
        const res = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setResults(data);
    };

    const handleClose = () => {
        setTimeout(() => {
            setIsOpen(false);
            setQuery('');
            setResults([]); // Clear results when the modal is closed
        }, 100);
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="flex items-center gap-1 cursor-text rounded-full px-5 bg-[#99ab61] text-[#eee2d8] py-2" placeholder='Search Creators'>
                <MagnifyingGlassIcon className="w-5" /> <span className={` ${hidden && 'md:max-lg:hidden'} font-normal`}>Search Creators</span>
            </button>

            {isOpen && (
                <motion.div

                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start pt-16 md:pt-0 md:items-center w-full justify-center z-[9999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >

                    <motion.div
                        ref={modalRef}
                        className="bg-[#f2f5fe] p-6 rounded-3xl w-11/12 md:2/3 lg:w-1/3 flex flex-col gap-4 text-[#321c06]"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >

                        <div className='flex flex-row-reverse items-center gap-4 '>
                            <button onClick={handleClose} className="font-bold text-xl border rounded-full p-2 bg-white shadow-xl hover:bg-gray-200 text-[#55320f]">
                                <XMarkIcon className='size-6' />
                            </button>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search creators"
                                className="w-full p-3 border rounded-full bg-white hover:bg-gray-100 shadow-xl "
                            />
                        </div>

                        <ul className="space-y-2">
                            {results.length === 0 && query && (
                                <li className="text-center text-gray-500">No creators found</li>
                            )}
                            {results.map((user) => (
                                <li key={user._id} className="border p-2 rounded-full hover:bg-gray-100">
                                    <Link href={`/${user.username}`} onClick={handleClose}>
                                        <div className='flex items-center gap-3'>

                                            <CldImage
                                                className='rounded-full'
                                                width={35}
                                                height={35}
                                                src={user.profilepic || 'https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745137142/jzcrsb73zm86nw3ntyfn.jpg'}
                                                alt='Profile Picture'
                                            />

                                            <h1 className='text-lg font-semibold'>
                                                {user.name}
                                            </h1>

                                            <h1 className='text-base'>
                                                @{user.username}
                                            </h1>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
