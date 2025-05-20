import React from 'react'
import CreatorPage from '@/components/CreatorPage'
import { notFound } from 'next/navigation'
import connectDB from '../db/connectDb'
import User from '../models/User'

export async function generateMetadata({ params }) {
  const { username } = await params;
  let name;
  let favicon;
  const checkUser = async (username) => {
    await connectDB()
    let user = await User.findOne({ username: username })
    if (!user) {
      return notFound()
    } else {
      name = user.name
      favicon = user.profilepic
    }
  }
  await checkUser(username)

  return {
    title: `${name} | Have A Chai`,
    description: `Support ${name} with a cup of chai!`,
  };
}

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
