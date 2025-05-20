"use client"

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate, fetchPayments, fetchUser } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import { socialOptions } from './SocialOptions'
import { openSans } from "@/app/fonts";


const CreatorPage = ({ username }) => {
    const { data: session } = useSession()
    const [paymentForm, setPaymentForm] = useState({ name: '', cups: 1, customCups: '', message: '' })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const searchParams = useSearchParams()
    const router = useRouter()

    const totalDonated = payments.reduce((sum, p) => sum + p.amount, 0) / 100;

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get('paymentdone') == "true") {
            toast.success('Thanks for Donation', {
            });
            router.push(`/${username}`)
        }
    }, [])

    const handleChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
        // console.log(paymentForm);
    }

    const getData = async () => {
        setIsLoaded(false);
        let user = await fetchUser(username)
        setCurrentUser(user)
        let dbPayments = await fetchPayments(username)
        setPayments(dbPayments)

        setTimeout(() => {
            setIsLoaded(true)
        }, 1000)

    }

    const getCloudinaryImage = (img, fallback) => img || fallback;

    const pay = async (amount) => {
        if (!amount || amount <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        // Ensure name is provided for payment
        if (!paymentForm.name || paymentForm.name.trim().length < 2) {
            toast.error("Please enter your name.");
            return;
        }

        // Check if payment credentials are configured
        if (
            currentUser.razorpayid &&
            currentUser.razorpayid !== '' &&
            currentUser.razorpaysecret &&
            currentUser.razorpaysecret !== ''
        ) {
            try {
                let a = await initiate(amount, username, paymentForm);
                let orderId = a.id;

                const options = {
                    key: currentUser.razorpayid,
                    amount: amount,
                    currency: "INR",
                    name: "Have A Chai",
                    description: "Support your favorite creator",
                    image: "https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220240/xidy21xxycirmm0gffwa.png",
                    order_id: orderId,
                    callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,

                    prefill: {
                        name: paymentForm.name || "Anonymous",
                    },
                    theme: {
                        color: "#deac80",
                    },
                };

                const rzp1 = new Razorpay(options);
                rzp1.open();
            } catch (err) {
                console.error("Payment error:", err);
                toast.error("Failed to start payment. Please try again.");
            }
        } else {
            toast.error("Sorry! Payment method is not set up by this user.");
        }
    };
    return (
        <div className={` ${openSans.className} bg-[#eee2d8] `}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script >
            <ToastContainer
                limit={3}
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                pauseOnFocusLoss={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                theme="light"
                transition={Slide}
            />
            {
                !isLoaded ? (

                    <div className='animate-pulse'>
                        {/* Cover and Profile Skeleton */}
                        <div className='flex justify-center bg-[#bebebe] w-full mt-16  h-[25vw]  max-h-[50vh] relative shadow-xl'>
                            <div className='bg-[#9d9c9c] rounded-xl w-[20vw] aspect-square max-w-32 max-h-32 mx-auto absolute -bottom-16'>
                            </div>
                        </div>

                        {/* User Details Skeleton */}
                        <div className='mt-20 mb-6'>
                            <div className='flex flex-col gap-2 justify-center items-center mt-6 '>
                                <div className="h-[5vw] max-h-10 w-1/3 max-w-48 bg-[#9d9c9c] rounded-lg"></div>
                                <div className="h-5 w-1/5 max-w-36 bg-[#9d9c9c] rounded-lg"></div>
                                <div className="h-5 w-1/4 max-w-56 bg-[#bebebe] rounded-lg"></div>
                                <div className="h-5 w-2/5 max-w-48 bg-[#bebebe] rounded-lg"></div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center justify-center gap-2'>
                            <div className='pb-20 flex flex-col-reverse lg:flex-row justify-center items-center gap-6 container mx-auto h-full'>

                                {/* Supporters Box Skeleton */}
                                <div className=" flex flex-col w-[90%] lg:w-full lg:h-[500px] bg-[#f2f5fe] p-6 pr-4 rounded-xl shadow-xl gap-6 flex-1">

                                    <div className="w-1/2 h-12 rounded-lg mx-auto lg:mx-0 bg-[#9d9c9c]"></div>

                                    <div className="flex items-center w-full gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#bebebe]"></div>
                                        <div className="w-2/4 h-6 rounded-full bg-[#9d9c9c]"></div>
                                    </div>
                                    <div className="flex items-center w-full gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#bebebe]"></div>
                                        <div className="w-1/4 h-6 rounded-full bg-[#9d9c9c]"></div>
                                    </div>
                                    <div className="flex items-center w-full gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#bebebe]"></div>
                                        <div className="w-3/4 h-6 rounded-full bg-[#9d9c9c]"></div>
                                    </div>
                                    <div className="flex items-center w-full gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#bebebe]"></div>
                                        <div className="w-2/5 h-6 rounded-full bg-[#9d9c9c]"></div>
                                    </div>

                                </div>

                                {/* Payment Box Skeleton */}
                                <div className={`flex flex-col w-[90%] lg:w-full lg:h-[500px] bg-[#f2f5fe]  p-6 rounded-xl shadow-xl gap-6 flex-1`}>
                                    <div className="w-3/4 h-12 rounded-lg mx-auto lg:mx-0 bg-[#9d9c9c]"></div>
                                    <div className="w-full h-20 bg-[#9d9c9c] rounded-lg"></div>
                                    <div className="w-full h-10 bg-[#737373] rounded-lg"></div>
                                    <div className="w-full h-20 bg-[#9d9c9c] rounded-lg "></div>
                                    <div className="w-full h-10 mx-auto bg-[#9d9c9c] rounded-full"></div>

                                </div>

                            </div>

                            {/* About Section Skeleton */}
                            <div className='flex container justify-center'>
                                <div className={`flex w-[90%] lg:w-full rounded-xl bg-[#f2f5fe] justify-center items-center gap-2  py-6 px-10 shadow-xl mb-20`}>
                                    <div className='flex flex-col justify-center items-center mt-5 mb-10 w-full md:w-4/5'>

                                        <div className="w-2/3 max-w-40 bg-[#9d9c9c] rounded-lg h-12 mb-6"></div>

                                        <div className="max-h-64 w-full aspect-video rounded-t-lg bg-[#bebebe]"></div>
                                        <div className=" flex flex-col items-start justify-center p-6 h-48  gap-3 rounded-b-lg w-full bg-[#cfcfcf]">
                                            <div className="rounded-full w-full bg-[#9d9c9c] h-6"></div>
                                            <div className="rounded-full w-full bg-[#9d9c9c] h-6"></div>
                                            <div className="rounded-full w-3/4 bg-[#9d9c9c] h-6"></div>
                                            <div className="flex w-full gap-4 mt-2">
                                                <div className="h-10 w-10 bg-[#f2f5fe] rounded-lg"></div>
                                                <div className="h-10 w-10 bg-[#f2f5fe] rounded-lg"></div>
                                                <div className="h-10 w-10 bg-[#f2f5fe] rounded-lg hidden sm:block"></div>
                                                <div className="h-10 w-10 bg-[#f2f5fe] rounded-lg hidden sm:block"></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (

                    <>

                        {/* Cover and Profile Image */}
                        <div className='flex justify-center w-full mt-16  h-[25vw] max-h-[50vh] relative shadow-xl'>
                            <CldImage
                                className='object-cover w-full h-full max-h-[50vh]'
                                src={getCloudinaryImage(currentUser.coverpic, 'https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745137118/y15bomxh1b07wiwsukka.jpg')} placeholder='blur' blurDataURL='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745137118/y15bomxh1b07wiwsukka.jpg'
                                width={1000}
                                height={500}
                                sizes='100vw'
                                alt="Cover Photo"
                            />

                            <div className='bg-slate-600 rounded-xl w-[20vw] aspect-square max-w-32 max-h-32 mx-auto border-[#321c06] overflow-hidden border-4 absolute -bottom-16'>
                                <CldImage
                                    className='w-full h-full bg-slate-600 object-cover'
                                    src={getCloudinaryImage(currentUser.profilepic, 'https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745137142/jzcrsb73zm86nw3ntyfn.jpg')}
                                    placeholder='blur'
                                    blurDataURL='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745137142/jzcrsb73zm86nw3ntyfn.jpg'
                                    width={1080}
                                    height={1080}
                                    alt="Profile Photo"
                                />
                            </div>
                        </div>



                        {/* User Details */}
                        <div className='mt-20 mb-6'>
                            <div className='flex flex-col gap-1 justify-center items-center mt-6 text-[#321c06]'>
                                <h1 className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>{currentUser.name ? currentUser.name : currentUser.username}</h1>
                                <h2 className='font-medium text-sm sm:text-base md:text-lg lg:text-xl'>@{currentUser.username}</h2>

                                {currentUser.tagline && (
                                    <p className='text-slate-500 text-xs sm:text-sm md:text-base lg:text-lg'>{currentUser.tagline}</p>

                                )}

                                {payments.length > 0 && (
                                    <p className='text-slate-500 text-xs sm:text-sm md:text-base lg:text-lg'>
                                        {payments.length} Supporter{payments.length > 1 ? 's' : ''} | ₹
                                        {totalDonated.toLocaleString('en-IN')} Donated
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col items-center justify-center gap-2'>

                            <div className='pb-20 flex flex-col-reverse lg:flex-row justify-center items-center gap-6 container mx-auto h-full'>

                                {/* Supporters Box */}
                                <div className="scroll-smooth flex flex-col w-[90%] lg:w-full lg:h-[500px] bg-[#f7dcb9] p-6 pr-4 rounded-xl text-black font-semibold text-sm sm:text-base lg:text-lg shadow-xl gap-4 flex-1 overflow-hidden">
                                    <h2 className='text-center md:text-start text-xl md:text-2xl lg:text-3xl font-bold ms-2 text-[#321c06]'> Recent Supporters</h2>
                                    <ul className='flex flex-col gap-4 text-[#321c06] overflow-y-auto min-h-0 pr-2 scroll-smooth scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-[#321c06] scrollbar-track-[#eee2d8]'>

                                        {payments.length === 0 ? (
                                            <li className="text-center text-gray-500">No supporters yet!</li>
                                        ) : (
                                            payments
                                                .slice()
                                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by Time Descending
                                                .slice(0, 6)
                                                .map((p, i) => (
                                                    <li key={i} className='flex gap-3 items-start'>
                                                        <CldImage
                                                            className='w-9 h-9'
                                                            width={200}
                                                            height={200}
                                                            src="https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220240/xidy21xxycirmm0gffwa.png"
                                                            alt="Supporters Icon"
                                                        />
                                                        <div className='flex flex-col items-start justify-center gap-3 w-full'>
                                                            <p className='font-normal'>
                                                                <span className='font-bold'> {p.name} </span> donated
                                                                <span className='font-bold'> {p.amount / 100 / 100} </span> Chai cups
                                                            </p>
                                                            {p.message && (
                                                                <div className={`bg-[#b5c18e] rounded-lg font-normal text-[#f2f5fe] text-xs sm:text-sm md:text-base p-4 w-full ${openSans.className}`}>
                                                                    <h1>{p.message}</h1>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))
                                        )}

                                    </ul>
                                </div>

                                {/* Payment Form Box */}
                                <div className={`flex flex-col w-[90%] lg:w-full lg:h-[500px] bg-[#f7dcb9] text-[#321c06] p-6 rounded-xl font-normal text-base lg:text-lg shadow-xl gap-6 flex-1 ${openSans.className}`}>
                                    <h2 className='text-[#321c06] font-bold text-center md:text-start text-xl md:text-2xl lg:text-3xl'>Buy {currentUser.name} a Cup of Chai</h2>

                                    {/* Radio Buttons for Cup Selection */}
                                    <div className="flex gap-4 items-center justify-around bg-[#e8ac78] w-full p-4 rounded-lg border-2 border-[#bd783c] ">

                                        <CldImage
                                            className='w-12 sm:w-14 md:w-16 aspect-square -mt-2'
                                            src='https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220375/qq2qntdhryujoo8lpivc.png'
                                            width={100}
                                            height={100}
                                            alt='Chai Cup'
                                        />

                                        <h1 className='font-bold text-xl md:text-2xl text-[#bd783c]'>X</h1>


                                        {[1, 3, 5].map(num => (
                                            <label key={num} className="hidden sm:flex items-center gap-2 relative cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="cups"
                                                    value={num}
                                                    checked={paymentForm.cups === num && !paymentForm.customCups}
                                                    className={`appearance-none rounded-lg aspect-square w-[10vw] max-w-16 focus:border-opacity-0  bg-[#f2f5fe] border-2 border-[#bd783c]  checked:border-[#5a6635]  checked:bg-[#99ab61] focus:outline-none 
                                            ${paymentForm.cups === num && 'indeterminate:bg-[#99ab61] indeterminate:border-[#5a6635]'} `}
                                                    onChange={() => setPaymentForm({ ...paymentForm, cups: num, customCups: '' })}
                                                />
                                                <h1 className={`absolute w-full text-center text-sm sm:text-base md:text-lg lg:text-xl font-semibold
                                                     ${paymentForm.cups === num ?
                                                        'text-[#f2f5fe]' :
                                                        'text-[#55320f]'}
                                                        `}>
                                                    {num}
                                                </h1>
                                            </label>
                                        ))}

                                        {/* Custom Cups Input */}
                                        <input
                                            type="number"
                                            name="customCups"
                                            placeholder="10"
                                            className="rounded-lg p-2 text-sm sm:text-base md:text-lg lg:text-xl bg-[#f2f5fe] aspect-square w-[10vw] min-w-12 max-w-16 h-[10vw] min-h-12 max-h-16 focus:border-opacity-0 text-center font-semibold border-2 border-[#8d8d8d]"
                                            min={1}
                                            max={50}
                                            value={paymentForm.customCups || ''}
                                            onChange={(e) =>
                                                setPaymentForm({
                                                    ...paymentForm,
                                                    customCups: e.target.value,
                                                    cups: parseInt(e.target.value) || paymentForm.cups,
                                                })
                                            }
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        value={paymentForm.name}
                                        required={true}
                                        name='name'
                                        placeholder="Name"
                                        className='w-full rounded-md p-3 bg-[#f2f5fe] border-2 border-[#8d8d8d] focus:border-opacity-0'
                                    />
                                    <textarea
                                        type="text"
                                        onChange={handleChange}
                                        value={paymentForm.message}
                                        name='message'
                                        required={true}
                                        placeholder="Message"
                                        className='w-full rounded-md p-3 bg-[#f2f5fe] border-2 border-[#8d8d8d] resize-none focus:border-opacity-0 h-full scroll-smooth pr-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-[#321c06] scrollbar-track-[#eee2d8]'
                                    />
                                    <button
                                        className='rounded-full transition-all font-semibold text-[#f2f5fe] bg-[#c9544f] p-2 px-3 disabled:bg-[#7b2c2a] disabled:text-[#babcc0]'
                                        disabled={paymentForm.name.length < 3 || (!paymentForm.cups || paymentForm.cups < 1)}
                                        onClick={() => pay(paymentForm.cups * 100 * 100)}
                                    //*100 convert it from cups to paisa, *100 again covert it from paisa to rupees
                                    >
                                        {paymentForm.cups > 0 ? `Pay ₹${paymentForm.cups * 100}` : 'Pay'}
                                    </button>
                                </div>

                            </div>

                            {currentUser.about && (

                                <div className='flex container justify-center'>

                                    <div className={`flex w-[90%] lg:w-full rounded-xl ${openSans.className} justify-center items-center gap-2 bg-[#f7dcb9] py-6 px-10 text-[#321c06] shadow-xl mb-20`}>
                                        <div className='flex flex-col justify-center items-center mt-5 mb-10 md:w-4/5'>
                                            <h1 className='text-2xl md:text-3xl lg:text-4xl mb-6 font-bold text-center md:text-start'>About {currentUser.name}</h1>

                                            {/* Cover Picture */}
                                            <CldImage
                                                className='max-h-64 w-full rounded-t-lg object-cover aspect-video'
                                                src={currentUser.coverpic ? currentUser.coverpic : process.env.NEXT_PUBLIC_DEFAULT_COVER_PICTURE}
                                                width={1200}
                                                height={1200}
                                                alt='Cover Picture'
                                            />

                                            {/* Bio */}
                                            <div className='flex flex-col w-full gap-5 rounded-b-lg bg-[#eee2d8] font-medium text-[#434242] p-4 text-sm md:text-base lg:text-lg'>
                                                <h1>{currentUser.about}</h1>

                                                {/* Link */}
                                                <div className='flex flex-wrap items-center justify-center gap-6'>
                                                    {currentUser.socials && Object.entries(currentUser.socials).map(([platform, link], index) => {
                                                        const selectedPlatform = socialOptions.find(option => option.value === platform);

                                                        // Gmail logic
                                                        const href =
                                                            platform === 'gmail'
                                                                ? `https://mail.google.com/mail/?view=cm&fs=1&to=${link}`
                                                                : link.startsWith('http')
                                                                    ? link
                                                                    : `https://${link}`;

                                                        return selectedPlatform && (
                                                            <div key={platform} className="flex items-center gap-2">
                                                                <a href={href} target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg bg-[#f2f5fe]">
                                                                    <CldImage
                                                                        className="w-5 md:w-7 h-5 md:h-7"
                                                                        width={30}
                                                                        height={30}
                                                                        src={selectedPlatform.icon}
                                                                        alt={selectedPlatform.label}
                                                                    />
                                                                </a>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            )}
                        </div>
                    </>
                )
            }




        </div>
    )
}

export default CreatorPage;
