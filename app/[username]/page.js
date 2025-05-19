import React from 'react'
import Image from 'next/image'
import CreatorPage from '@/components/CreatorPage'
import { notFound } from 'next/navigation'
import connectDB from '../db/connectDb'
import User from '../models/User'


const Username = async ({ params }) => {
  const { username } = await params;

  const checkUser = async (username) => {
    await connectDB()
    let user = await User.findOne({ username: username })
    if (!user) {
      return notFound()
    }
  }
  await checkUser(username)
  return (
    <>
      <CreatorPage username={username} />
    </>
  )
}

export default Username
