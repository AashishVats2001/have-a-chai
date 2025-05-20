"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { ttNorms } from '@/app/fonts';
import MessageList from '@/components/MessagesList'
import { fetchUser } from '@/actions/useractions'


const MessageClient = () => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const [user, setUser] = useState("")

  const getData = useCallback(async () => {
    if (!session?.user?.name) return;
    const username = await fetchUser(session.user.name);
    setUser(username.username);
  }, [session]);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push('/login')
    } else if (status === "authenticated") {
      getData()
    }
  }, [status, getData, router])


  return (
    <div>
      <div className={`flex flex-col text-[#321c06] ${ttNorms.className} gap-10 w-full md:w-[95%] font-bold`}>
        <MessageList username={user} />
      </div>
    </div >
  )
}

export default MessageClient
