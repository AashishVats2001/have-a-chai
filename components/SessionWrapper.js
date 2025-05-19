"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"


export default function SessionWrapper({ children }) {
    return (
        //Don't refetch input or session user on tab change or 
        // window change even when changes are not saved 
        <SessionProvider refetchOnWindowFocus={false}> 
            {children}
        </SessionProvider>
    )
}
