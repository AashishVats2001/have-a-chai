"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter, redirect } from 'next/navigation'
import { fetchUser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';


const Dashboard = () => {

    const { data: session, status } = useSession()
    const router = useRouter();
    const [form, setForm] = useState({})


    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            router.push('/login')
        } else if (status === "authenticated") {
            redirect('/dashboard/edit-profile')
            // router.push('/dashboard')
        }
    }, [status, session, router])


    return (
        <>
            <h1>Rerouting to Edit Profile</h1>
        </>
    )

}
export default Dashboard