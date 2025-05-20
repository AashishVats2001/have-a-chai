"use client"

import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter, redirect } from 'next/navigation'


const Dashboard = () => {

    const { data: session, status } = useSession()
    const router = useRouter();

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