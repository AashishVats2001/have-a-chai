"use client"

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser, updateProfile, deleteUser } from '@/actions/useractions'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, TrashIcon, PlusIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { socialOptions } from '@/components/SocialOptions'
import Spinner from '@/components/Spinner'

import { openSans } from "@/app/fonts";

const Profile = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [form, setForm] = useState({ socials: [] })
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [initialForm, setInitialForm] = useState({});
    const initialFormRef = useRef({})
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
    const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false);
    const [showSocialDropdowns, setShowSocialDropdowns] = useState({});
    const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null);
    // const [verifying, setVerifying] = useState(false)
    const socialRef = useRef();


    const getData = useCallback(async () => {
        if (status === "authenticated" && session?.user?.name) {
            setIsLoading(true);
            try {
                let user = await fetchUser(session.user.name);
                const socialsArray = Object.entries(user.socials || {}).map(([platform, url]) => ({
                    platform,
                    url
                }));

                const normalizedUser = {
                    ...user,
                    socials: socialsArray
                };

                setForm(normalizedUser);
                setInitialForm(normalizedUser);
                initialFormRef.current = normalizedUser;
            } catch (error) {
                console.error('Error Fetching User Data:', error);
                router.push('/login');
            } finally {
                // Artificial delay to simulate loading
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        }
    }, [session, status]);



    // Check if the user is authenticated and fetch data
    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push('/login')
        } else if (status === "authenticated") {
            // router.push('/dashboard')
            getData()

        }
    }, [status, session, router, getData])

    // Razorpay Credentials Real-Time Verification
    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            const { razorpayid, razorpaysecret } = form;

            if (razorpayid && razorpaysecret) {
                // setVerifying(true);
                try {
                    const res = await fetch('/api/verify-razorpay', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key_id: razorpayid, key_secret: razorpaysecret }),
                    });

                    const data = await res.json();
                    setVerificationStatus(data.success ? 'valid' : 'invalid');
                } catch (err) {
                    setVerificationStatus('invalid');
                } finally {
                    // setVerifying(false);
                }
            } else {
                setVerificationStatus(null); // Clear status if fields are empty
            }
        }, 800); // debounce by 800ms

        return () => clearTimeout(delayDebounce);
    }, [form.razorpayid, form.razorpaysecret]);

    const isFormUnchanged = JSON.stringify(form) === JSON.stringify(initialForm);

    //Delete image from cloudinary server function
    const deleteImageFromCloudinary = async (publicId) => {
        try {
            const res = await fetch('/api/delete-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ publicId })
            })
            const data = await res.json();

            if (!data.success) throw new Error(data.message);
        } catch (error) {
            console.error('Error deleting image: ', error)
            throw error;
        }
    }

    // Cover and Profile Image Change function
    const handleImageChange = async (type, newImageUrl, newPublicId) => {
        const isProfile = type === "profile";

        // Update form state with new image
        setForm(prev => ({
            ...prev,
            [isProfile ? "profilepic" : "coverpic"]: newImageUrl,
            [isProfile ? "profilepicpublicid" : "coverpicpublicid"]: newPublicId,
        }));

        toast('Remember to save changes before leaving.')
    };

    // Show alert when closing window without saving changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!isFormUnchanged && form.delete !== 'DELETE') {

                e.preventDefault();
                e.returnValue = ''; // This is required for Chrome
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isFormUnchanged, form]);

    const handleSocialBlur = (e) => {
        if (!socialRef.current.contains(e.relatedTarget)) {
            setShowSocialDropdowns(false);  // Close dropdown if focus moves outside of it
        }
    }

    const verifyRazorpayCredentials = async (key_id, key_secret) => {
        try {
            const res = await fetch('/api/verify-razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key_id, key_secret }),
            });

            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Verification error:', error);
            return { success: false, message: 'Verification failed' };
        }
    };

    const handlePlatformSelect = (index, platform) => {
        const updatedSocials = [...form.socials];
        updatedSocials[index].platform = platform;
        setForm(prevForm => ({
            ...prevForm,
            socials: updatedSocials,
        }));

        // Close dropdown after selecting
        setShowSocialDropdowns(prev => ({
            ...prev,
            [index]: false,
        }));
    };


    const isProfileUnchanged = () => {
        const keys = ["name", "username", "tagline", "about", "profilepic", "coverpic", "socials"];
        return keys.every((key) => form[key] === initialForm[key]);
    };

    const isPaymentUnchanged = () => {
        const keys = ["razorpayid", "razorpaysecret"];
        return keys.every((key) => form[key] === initialForm[key]);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSocialsChange = (index, key, value) => {
        const updatedSocials = [...(form.socials || [])];
        updatedSocials[index][key] = value;
        setForm(prev => ({ ...prev, socials: updatedSocials }));
    };

    const addSocialInput = () => {
        const current = form.socials || [];
        setForm(prev => ({
            ...prev,
            socials: [...current, { platform: '', url: '' }]
        }));
    };

    const removeSocialInput = (index) => {
        const updated = [...(form.socials || [])];
        updated.splice(index, 1);
        setForm(prev => ({ ...prev, socials: updated }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsProfileSubmitting(true);
        try {
            const isCoverPicChanged = initialForm.coverpicpublicid === form.coverpicpublicid
            const isProfilePicChanged = initialForm.profilepicpublicid === form.profilepicpublicid

            const validSocials = (form.socials || []).filter(s => s.platform && s.url);
            const socialsObject = validSocials.reduce((acc, curr) => {
                acc[curr.platform] = curr.url;
                return acc;
            }, {});

            const updatedForm = {
                ...form,
                socials: validSocials.reduce((acc, curr) => {
                    if (typeof curr.platform === 'string' && typeof curr.url === 'string') {
                        acc[curr.platform] = curr.url;
                    }
                    return acc;
                }, {})
            };

            await updateProfile(updatedForm, session.user.name);

            if (!isCoverPicChanged) {
                await deleteImageFromCloudinary(initialForm.coverpicpublicid)
            }
            if (!isProfilePicChanged) {
                await deleteImageFromCloudinary(initialForm.profilepicpublicid)
            }
            setInitialForm(form);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
        }
        setTimeout(() => {
            setIsProfileSubmitting(false);
        }, 1000)
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsPaymentSubmitting(true);

        if (form.razorpayid && form.razorpaysecret) {
            try {
                // Verify Razorpay credentials
                const verificationResult = await verifyRazorpayCredentials(form.razorpayid, form.razorpaysecret);

                if (!verificationResult.success) {
                    toast.error('Invalid Razorpay credentials. Please check your ID and Secret.');
                    return;
                }

                await updateProfile(form, session.user.name)
                setInitialForm(form);
                toast.success('Payment details updated successfully');
            } catch (error) {
                toast.error('Error updating payment details: ' + error.message);
            }
        } else {
            await updateProfile(form, session.user.name)
            setInitialForm(form);
            toast.success('Payment details updated successfully');
        }
        setTimeout(() => {
            setIsPaymentSubmitting(false);
        }, 1000)

    };


    const handleDeleteAccount = async () => {
        if (form.delete !== "DELETE") {
            toast.error('Please type "DELETE" in uppercase to confirm account deletion.', {
            });
            return;
        } else {
            setDeleteModalOpen(true)
        }
    };

    const deleteAccount = async () => {
        try {
            const newCover = form.coverpicpublicid
            const newProfile = form.profilepicpublicid

            const isDefaultCoverId = newCover === process.env.NEXT_PUBLIC_DEFAULT_COVER_PUBLIC_ID
            const isDefaultProfileId = newProfile === process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PUBLIC_ID

            const res = await deleteUser(session.user.name);

            if (res.success) {
                if (!isDefaultCoverId) {
                    await deleteImageFromCloudinary(newCover)
                }
                if (!isDefaultProfileId) {
                    await deleteImageFromCloudinary(newProfile)
                }
                setDeleteModalOpen(false)
                toast.success('Account deleted successfully.', {
                });
                setTimeout(() => {
                    signOut({ callbackUrl: '/' });
                }, 2000);

            } else {
                throw new Error(res.message || "Unknown error");
            }
        } catch (error) {
            toast.error('Error deleting account: ' + error.message, {
            });
        }
    }


    return (
        <div>
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

            {/* DELETE ACCOUNT CONFIRMATION MODAL */}
            <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-[#f2f5fe]  text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-[#f2f5fe]  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-[#ff3131]" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Delete account
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete your account? All of your data will be permanently removed.
                                                This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => deleteAccount()}
                                    className="inline-flex w-full justify-center rounded-full text-[#f2f5fe] bg-[#ff3131] px-3 py-2 text-sm font-semibold shadow-xs hover:bg-[#cf3737] sm:ml-3 sm:w-auto"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setDeleteModalOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-200 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* Dashboard */}
            {isLoading ? (
                <div className={`flex flex-col text-[#9d9c9c] ${openSans.className} text-center md:text-start gap-2 md:gap-10 w-full md:w-[95%] font-bold`}>
                    <h1 className='text-3xl md:text-5xl animate-pulse'>Dashboard</h1>
                    <h1 className={`text:lg md:text-xl font-normal md:-mt-6 md:-mb-6`}>Edit profile</h1>


                    {/* Profile Skeleton */}
                    <div className="bg-[#f7dcb9] shadow-xl rounded-lg p-4 w-full mx-auto">
                        <div className="animate-pulse flex flex-col justify-center w-full gap-5 p-3">

                            <div className="max-w-48 w-full h-10 bg-[#9d9c9c] mx-auto rounded-lg"></div>

                            <div className='relative'>
                                {/* Cover Skeleton */}
                                <div className='w-full lg:h-64 bg-[#9d9c9c] max-h-64 aspect-video object-cover rounded-lg'>
                                </div>

                                {/* Profile Skeleton */}
                                <div className="absolute left-6 bottom-[-2rem]">
                                    <div className="rounded-lg bg-[#f2f5fe] w-[20vw] md:w-[12vw] aspect-square max-w-32 max-h-32 object-cover">
                                    </div>
                                </div>
                            </div>

                            {/* Input Skeleton */}
                            <div className="flex flex-col gap-8 mt-14 w-full">
                                 <div className='grid grid-cols-6 gap-4'>
                                    <div className="h-6 bg-[#9d9c9c] rounded-lg col-span-3 sm:col-span-2 lg:col-span-1"></div>
                                    <div className="h-12 bg-[#f2f5fe] rounded-lg col-span-6"></div>
                                </div>
                                <div className='grid grid-cols-6 gap-4'>
                                    <div className="h-6 bg-[#9d9c9c] rounded-lg col-span-3 sm:col-span-2 lg:col-span-1"></div>
                                    <div className="h-12 bg-[#f2f5fe] rounded-lg col-span-6"></div>
                                </div>

                                <div className='grid grid-cols-6 gap-4'>
                                    <div className="h-6 bg-[#9d9c9c] rounded-lg col-span-3 sm:col-span-2 lg:col-span-1"></div>
                                    <div className="h-12 bg-[#f2f5fe] rounded-lg col-span-6"></div>
                                </div>

                                <div className='grid grid-cols-6 gap-4'>
                                    <div className="h-6 bg-[#9d9c9c] rounded-lg col-span-3 sm:col-span-2 lg:col-span-1"></div>
                                    <div className="h-12 bg-[#f2f5fe] rounded-lg col-span-6"></div>
                                </div>

                                <div className='grid grid-cols-6 gap-4'>
                                    <div className="h-6 bg-[#9d9c9c] rounded-lg col-span-3 sm:col-span-2 lg:col-span-1"></div>
                                    <div className="h-12 bg-[#f2f5fe] rounded-lg col-span-6"></div>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/* Payment Skeleton */}
                    <div className="bg-[#f7dcb9] shadow-xl rounded-lg p-4 w-full mx-auto">
                        <div className="animate-pulse w-full">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="h-6 bg-[#9d9c9c] rounded-lg col-span-3 sm:col-span-2 lg:col-span-1"></div>
                                <div className="h-12 bg-[#f2f5fe] rounded-lg col-span-12"></div>
                                <div className="h-12 bg-[#f2f5fe] rounded-lg col-span-10 sm:col-span-11"></div>
                                <div className="h-12 bg-[#9d9c9c] rounded-lg col-span-2 sm:col-span-1"></div>
                            </div>
                        </div>

                    </div>

                    {/* Delete Skeleton */}
                    <div className="bg-[#f7dcb9] shadow-xl rounded-lg p-4 w-full mx-auto">
                        <div className="animate-pulse flex flex-col justify-center w-full gap-6">
                            <div className="grid grid-cols-6  gap-4">
                                <div className="h-6 bg-[#9d9c9c] rounded-lg col-span-1"></div>
                                <div className=" bg-[#f2f5fe] rounded-lg hidden sm:block col-span-1 col-start-6 row-span-3"></div>
                                <div className="h-6 bg-[#9d9c9c] rounded-lg col-span-3"></div>
                                <div className="h-12 bg-[#f2f5fe] rounded-lg col-span-5"></div>
                            </div>
                        </div>


                    </div>
                </div>
            ) : (
                <div className={`flex flex-col text-[#321c06] ${openSans.className}  text-center md:text-start gap-2 md:gap-10 w-full md:w-[95%] font-bold`}>
                    <h1 className='text-3xl md:text-5xl'>Dashboard</h1>
                    <h1 className={`text:lg md:text-xl font-normal md:-mt-6 md:-mb-6`}>Edit profile</h1>


                    <form onSubmit={handleProfileSubmit}>
                        {/* Personal Info */}

                        <div className='flex flex-col gap-5 bg-[#f7dcb9] text-xl md:text-2xl text-start shadow-xl p-7 rounded-lg'>
                            <h1 className='text-3xl md:text-4xl text-center md:text-start'>Personal Info</h1>

                            {/* Cover and Profile Photo */}
                            <div className='relative'>

                                {/* Cover Profile */}
                                <CldUploadWidget
                                    uploadPreset="haveachai_preset"
                                    options={{
                                        sources: ['local', 'url', 'camera'],
                                        multiple: false,
                                        resourceType: 'image',
                                        maxFileSize: 10000000, // 10MB
                                        clientAllowedFormats: ['jpg'],
                                        showAdvancedOptions: false,
                                        defaultSource: "local", styles: {
                                            palette: {
                                                window: "#F2F5FE",
                                                sourceBg: "#F7DCB9",
                                                windowBorder: "#c7a49f",
                                                tabIcon: "#55320F",
                                                inactiveTabIcon: "#807676",
                                                menuIcons: "#B5C18E",
                                                link: "#C9544F",
                                                action: "#C9544F",
                                                inProgress: "#99cccc",
                                                complete: "#78b3b4",
                                                error: "#FF3131",
                                                textDark: "#321C06",
                                                textLight: "#D8CFCF"
                                            },
                                            fonts: {
                                                default: null,
                                                "sans-serif": {
                                                    url: null,
                                                    active: true
                                                }
                                            }
                                        },
                                    }}
                                    onSuccess={(result, { widget }) => {
                                        const imageUrl = result?.info?.secure_url;
                                        const publicId = result?.info?.public_id;
                                        if (imageUrl && publicId) {
                                            handleImageChange("cover", imageUrl, publicId);
                                        } else {
                                            console.error('Cloudinary upload failed: Missing imageUrl or publicId');
                                        }
                                    }}
                                    onQueuesEnd={(_, { widget }) => {
                                        widget.close();
                                    }}
                                >
                                    {({ open }) => {
                                        return (
                                            <div
                                                className='w-full cursor-pointer'
                                                role="button"
                                                title="Click to change cover photo"
                                                tabIndex={0}
                                                onClick={() => open()}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        open()
                                                    };
                                                }}
                                            >
                                                <CldImage
                                                    className='w-full lg:h-64 max-h-64 aspect-video object-cover rounded-lg border-4 border-[#321c06] brightness-50 hover:brightness-[.4] transition-all'
                                                    src={form.coverpic || process.env.NEXT_PUBLIC_DEFAULT_COVER_PICTURE}
                                                    width={1200}
                                                    height={300}
                                                    alt='Cover Picture'
                                                />
                                                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#f2f5fe] pointer-events-none'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 sm:size-10 md:size-14">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        );
                                    }}
                                </CldUploadWidget>

                                {/* Profile Photo */}
                                <div className='absolute left-6 bottom-[-2rem]'>
                                    <CldUploadWidget
                                        uploadPreset="haveachai_preset"
                                        options={{
                                            sources: ['local', 'url', 'camera'],
                                            multiple: false,
                                            resourceType: 'image',
                                            maxFileSize: 5000000, // 5MB,
                                            clientAllowedFormats: ['jpg'],
                                            showAdvancedOptions: false,
                                            defaultSource: "local", styles: {
                                                palette: {
                                                    window: "#F2F5FE",
                                                    sourceBg: "#F7DCB9",
                                                    windowBorder: "#c7a49f",
                                                    tabIcon: "#55320F",
                                                    inactiveTabIcon: "#807676",
                                                    menuIcons: "#B5C18E",
                                                    link: "#C9544F",
                                                    action: "#C9544F",
                                                    inProgress: "#99cccc",
                                                    complete: "#78b3b4",
                                                    error: "#FF3131",
                                                    textDark: "#321C06",
                                                    textLight: "#D8CFCF"
                                                },
                                                fonts: {
                                                    default: null,
                                                    "sans-serif": {
                                                        url: null,
                                                        active: true
                                                    }
                                                }
                                            },
                                        }}
                                        onSuccess={(result, { widget }) => {
                                            const imageUrl = result?.info?.secure_url;
                                            const publicId = result?.info?.public_id;
                                            if (imageUrl && publicId) {
                                                handleImageChange("profile", imageUrl, publicId);
                                            } else {
                                                console.error('Cloudinary upload failed: Missing imageUrl or publicId');
                                            }
                                        }}
                                        onQueuesEnd={(_, { widget }) => {
                                            widget.close();
                                        }}
                                    >
                                        {({ open }) => {
                                            return (
                                                <div
                                                    className='relative cursor-pointer'
                                                    role="button"
                                                    title="Click to change profile photo"
                                                    tabIndex={0}
                                                    onClick={() => open()}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            open()
                                                        }
                                                    }}
                                                >
                                                    <CldImage
                                                        className='rounded-lg border-4 border-[#321c06] w-[20vw] md:w-[12vw] aspect-square max-w-32 max-h-32 object-cover brightness-50 hover:brightness-[.4]'
                                                        src={form.profilepic || process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PICTURE}
                                                        width={200}
                                                        height={200}
                                                        alt='Profile Picture'
                                                    />
                                                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#f2f5fe] pointer-events-none'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 sm:size-8 md:size-10 ">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </CldUploadWidget>
                                </div>
                            </div>


                            {/* Name */}
                            <h1 className=' mt-14 font-bold'>Name</h1>
                            <input
                                type="text"
                                name='name'
                                placeholder='John Doe...'
                                onChange={handleChange}
                                required
                                value={form.name || ""}
                                className='rounded-lg p-3 font-semibold text-base bg-[#f2f5fe] text-[#282424] focus:shadow-xl transition-all'
                            />

                            {/* Username */}
                            <h1 className=''>Username</h1>
                            <input
                                type="text"
                                name='username'
                                onChange={handleChange}
                                placeholder='johndoe101...'
                                required
                                value={form.username || ""}
                                className='rounded-lg p-3 font-semibold text-base bg-[#f2f5fe] text-[#282424] focus:shadow-xl transition-all'
                            />

                            {/* Email */}
                            <h1 className=''>Email</h1>
                            <input
                                type="text"
                                name='email'
                                placeholder='youremail@gmail.com'
                                disabled
                                value={form.email || ""}
                                className='rounded-lg p-3 font-semibold text-base bg-[#e2e3e9] text-[#282424] cursor-not-allowed focus:shadow-xl transition-all'
                            />

                            {/* Tagline */}
                            <h1 className=''>Tagline</h1>
                            <input
                                type="text"
                                name='tagline'
                                placeholder='A tagline for your page...'
                                onChange={handleChange}
                                value={form.tagline || ""}
                                className='rounded-lg p-3 font-semibold text-base bg-[#f2f5fe] text-[#282424] focus:shadow-xl transition-all'
                            />

                            {/* About */}
                            <h1 className=''>About</h1>
                            <textarea
                                type="text"
                                name='about'
                                rows={3}
                                placeholder='Write about yourself or your brand...'
                                onChange={handleChange}
                                value={form.about || ""}
                                className='rounded-lg p-3 font-semibold text-base bg-[#f2f5fe] text-[#282424] focus:shadow-xl transition-all'
                            />

                            {/* Social Links */}

                            <h1 className=''>Social Links</h1>
                            <div className='flex flex-col gap-4 justify-center items-center overflow-x-scroll'>
                                {(form.socials || []).map((social, index) => {
                                    const usedPlatforms = form.socials?.map(s => s.platform).filter((_, i) => i !== index);


                                    return (
                                        <div key={index} className='flex w-full items-center '>


                                            {/* Dropdown */}
                                            <div
                                                className='relative'
                                                tabIndex={0}
                                                onBlur={(e) => {
                                                    if (!e.currentTarget.contains(e.relatedTarget)) {
                                                        setShowSocialDropdowns({});
                                                    }
                                                }}
                                            >

                                                <button
                                                    type='button'
                                                    id={'dropdownDefaultButton' + index}
                                                    data-dropdown-toggle="dropdown"
                                                    onClick={() => {
                                                        setShowSocialDropdowns(prev => ({
                                                            ...prev,
                                                            [index]: !prev[index],
                                                        }));
                                                    }}

                                                    className={`flex justify-between items-center text-base font-medium min-w-24 sm:w-44 text-[#625b5b] rounded-lg bg-[#f2f5fe] py-3 px-5 me-3`}
                                                >
                                                    {(() => {
                                                        const selectedPlatform = socialOptions.find(option => option.value === social.platform);
                                                        return selectedPlatform ? (
                                                            <div className="flex items-center gap-2">
                                                                <CldImage
                                                                    className="w-5 h-5 aspect-square object-cover"
                                                                    width={20}
                                                                    height={20}
                                                                    src={selectedPlatform.icon}
                                                                    alt={selectedPlatform.label}
                                                                />
                                                                <h1 className='hidden sm:block'>{selectedPlatform.label}</h1>
                                                            </div>
                                                        ) : "Select";
                                                    })()}

                                                    <svg className={`w-2.5 h-2.5 ms-3 transition-transform duration-200 ${showSocialDropdowns[index] ? "rotate-180" : "rotate-0"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                    </svg>
                                                </button>


                                                <div
                                                    id='socialdropdown'
                                                    ref={socialRef}
                                                    className={`absolute left-0 z-10 mt-2 origin-top-left overflow-y-scroll min-w-24 rounded-lg divide-y divide-gray-100 bg-[#f2f5fe] text-[#625b5b] transition-all duration-200 ease-out transform 
                                                ${showSocialDropdowns[index] ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible pointer-events-none'}`}
                                                >
                                                    <ul
                                                        className="py-2 text-base font-medium w-full flex flex-col bg-[#f2f5fe] rounded-lg h-56"
                                                        aria-labelledby="dropdownDefaultButton"
                                                    >
                                                        {socialOptions.map(socialItem => (
                                                            <li
                                                                className='px-2 py-1 w-full '
                                                                key={socialItem.label}
                                                                value={socialItem.value}


                                                            >
                                                                <button
                                                                    type='button'
                                                                    disabled={usedPlatforms.includes(socialItem.value)}
                                                                    onClick={() => handlePlatformSelect(index, socialItem.value)}
                                                                    className='block px-4 py-2 w-full bg-[#eee2d8] text-[#625b5b] transition-all hover:bg-[#deac80] hover:text-[#f2f5fe] rounded-lg disabled:hover:text-[#625b5b] disabled:grayscale disabled:hover:text-opacity-50 disabled:hover:bg-[#eee2d8] disabled:hover:bg-opacity-50 disabled:text-opacity-50 disabled:bg-opacity-50'
                                                                >
                                                                    <div className='flex items-center gap-2'>
                                                                        <CldImage
                                                                            className="w-5 h-5"
                                                                            width={20}
                                                                            height={20}
                                                                            src={socialItem.icon}
                                                                            alt={socialItem.label}
                                                                        />
                                                                        <h1 className='hidden sm:block'>{socialItem.label}</h1>
                                                                    </div>
                                                                </button>
                                                            </li>
                                                        ))}



                                                    </ul>

                                                </div>


                                            </div>

                                            {/* URL */}

                                            <input
                                                type="text"
                                                className='flex-1 rounded-lg p-3 text-base font-medium bg-[#f2f5fe] text-[#625b5b]'
                                                placeholder='Enter URL or email'
                                                value={social.url}
                                                onChange={(e) =>
                                                    handleSocialsChange(index, 'url', e.target.value)
                                                }
                                            />

                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    removeSocialInput(index)
                                                    setShowSocialDropdowns(prev => {
                                                        const newDropdowns = { ...prev };
                                                        delete newDropdowns[index];
                                                        return newDropdowns;
                                                    });
                                                }}
                                                title="Remove"
                                                className='bg-[#f2f5fe] p-3 rounded-lg ms-3 hover:bg-gray-200 transition-all'
                                            >
                                                <TrashIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={addSocialInput}
                                    className='w-fit rounded-lg bg-[#f2f5fe] text-[#85878b] p-2 mt-2 text-md font-medium hover:bg-gray-200 transition-all'
                                >
                                    <PlusIcon className="size-6 mx-1" />

                                </button>
                            </div>



                            {/* Save Changes */}
                            <button
                                type='submit'
                                disabled={isProfileUnchanged() || isLoading}
                                className={`rounded-full flex justify-center items-center text-[#eee2d8] text-base bg-[#c9544f] py-2 my-4 font-medium hover:bg-[#b14a46] transition-all ${isProfileUnchanged() && 'disabled'} disabled:bg-[#7e5958] disabled:cursor-not-allowed`}
                            >
                                {isProfileSubmitting ? (
                                    <>
                                        <Spinner size={20} color="#eee2d8" />
                                        <span className="ml-2">Saving...</span>
                                    </>
                                ) : (
                                    <span>Save Changes</span>
                                )}

                            </button>

                        </div>
                    </form >

                    <form onSubmit={handlePaymentSubmit}>

                        {/* Payment Details */}
                        <div className='flex flex-col gap-5 bg-[#f7dcb9] text-xl md:text-2xl shadow-xl p-7 rounded-lg'>
                            <h1 className='text-3xl md:text-4xl'>Payment Details</h1>
                            <h1 className='text-base md:text-lg font-normal italic'>(The Razorpay Secret is encypted before it gets stored in the database. Not even we can see your Razorpay Secret.)</h1>

                            {/* Razorpay ID */}
                            <h1 className='text-start'>Razorpay ID</h1>
                            <input
                                type="text"
                                name='razorpayid'
                                placeholder='Your Razorpay ID...'
                                onChange={handleChange}
                                value={form.razorpayid || ""}
                                className='rounded-lg p-3 font-semibold bg-[#f2f5fe] text-[#282424] text-base focus:shadow-xl transition-all'
                            />

                            {/* Razorpay Secret */}
                            <h1 className='text-start'>Razorpay Secret</h1>

                            <div className='flex gap-2 md:gap-4 w-full items-center'>

                                <input
                                    type={!showRazorpaySecret ? "password" : "text"}
                                    name='razorpaysecret'
                                    placeholder='Your Razorpay Secret...'
                                    onChange={handleChange}
                                    value={form.razorpaysecret || ""}
                                    className='rounded-lg p-3 w-full font-semibold bg-[#f2f5fe] text-[#282424] text-base focus:shadow-xl transition-all'
                                />
                                <button
                                    type="button"
                                    title='Show/Hide Secret'
                                    onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                                    className='bg-[#f2f5fe] p-3 rounded-lg hover:bg-gray-200'
                                >
                                    {showRazorpaySecret ? (
                                        <EyeIcon className="size-5 md:size-6" />
                                    ) : (
                                        <EyeSlashIcon className="size-5 md:size-6" />
                                    )}
                                </button>
                            </div>
                            <div className='flex gap-2 text-base md:text-lg'>

                                {/* {verifying && <p className="text-sm text-blue-600">Verifying credentials...</p>} */}
                                {verificationStatus === 'valid' && <p className="text-md text-green-600 font-medium flex gap-1 items-center"><CheckCircleIcon className='size-4 md:size-6'></CheckCircleIcon>Verified</p>}
                                {verificationStatus === 'invalid' && <p className="text-md text-red-600 font-medium flex gap-1 items-center"><XCircleIcon className='size-4 md:size-6'></XCircleIcon> Invalid Razorpay credentials</p>}
                            </div>

                            {/* Save Changes */}
                            <button
                                type='submit'
                                disabled={isPaymentUnchanged() || isLoading || verificationStatus === 'invalid'}
                                className={`rounded-full flex justify-center items-center text-[#eee2d8] bg-[#c9544f] py-2 my-4 font-medium hover:bg-[#b14a46] transition-all ${isPaymentUnchanged() && 'disabled'} disabled:bg-[#7e5958] disabled:cursor-not-allowed`}
                            >
                                {isPaymentSubmitting ? (
                                    <>
                                        <Spinner size={20} color="#eee2d8" />
                                        <span className="ml-2">Saving...</span>
                                    </>
                                ) : (
                                    <span>Save Changes</span>
                                )}
                            </button>

                        </div>
                    </form>

                    {/* DELETE ACCOUNT */}

                    <div className='flex flex-col gap-5 bg-[#f7dcb9] text-xl md:text-2xl shadow-xl p-7 rounded-lg'>
                        <h1 className='text-2xl md:text-4xl'>Delete Account</h1>

                        <h1 className='text-start'>Your account, along with all associated data will be permanently deleted and cannot be restored.</h1>
                        <h1 className='text-start text-[#ff3131]'>THIS ACTION IS IRREVERSIBLE.</h1>
                        <h1 className='text-start text-[#ff3131]'>TYPE “DELETE” (IN UPPERCASE) BELOW BEFORE DELETING ACCOUNT.</h1>

                        <input
                            type="text"
                            name="delete"
                            onChange={handleChange}
                            value={form.delete || ""}
                            placeholder='Type "DELETE" to confirm'
                            className='rounded-lg p-3 font-semibold bg-[#f2f5fe] text-[#282424] text-base focus:shadow-xl transition-all'
                        />

                        {/* Delete Account */}
                        <button
                            onClick={() => handleDeleteAccount()}
                            className='rounded-full text-[#eee2d8] text-base bg-[#ff3131] py-2 my-4 font-medium hover:bg-[#cf3737] transition-all'>Delete My Account
                        </button>

                    </div>
                </div >
            )}
        </div >
    )
}

export default Profile