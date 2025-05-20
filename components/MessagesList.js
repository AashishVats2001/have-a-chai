"use client"

import React, { useState, useEffect } from 'react'
import MessageItem from './MessageItem';
import { fetchPayments } from '@/actions/useractions'


const MessagesList = ({ username }) => {
  const [openId, setOpenId] = useState(null);
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (username) getData();
  }, [username]);

  const toggleMessage = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };


  const getData = async () => {
    setIsLoading(true);
    let dbPayments = await fetchPayments(username)
    setPayments(dbPayments)
    // Add artificial delay to simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>



      {isLoading ? (

        <>
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-center md:text-start text-[#9d9c9c] animate-pulse'>Messages/Payments</h1>
          <div className="flex flex-col bg-[#f7dcb9] shadow-lg p-7 gap-8 animate-pulse rounded-lg w-full mx-auto ">

            {[...Array(8)].map((_, i) => (

              <div key={i} className="bg-[#f2f5fe] rounded-lg p-3 flex justify-around gap-2 items-center shadow-xl">
                <div className='flex gap-4 items-center w-full'>
                  <div className="h-12 w-12 bg-[#9d9c9c] hidden sm:block rounded-full"></div>
                  <div className="h-6 w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 bg-[#9d9c9c] rounded-full"></div>
                </div>

                <div className="h-6 w-1/4 max-w-20 bg-[#9d9c9c] rounded-full col-span-1 col-start-12"></div>
              </div>

            ))}


          </div>
        </>

      ) : (

        <>
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-center md:text-start'>Messages/Payments</h1>
          <div className="flex flex-col gap-5 bg-[#f7dcb9] shadow-xl p-7 rounded-lg">
            <div className='flex flex-col w-full gap-4'>

              {payments.length === 0 ? (
                <li className="text-center text-gray-500">No supporters yet!</li>
              ) : (
                payments
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by time descending
                  .map((item, i) => (
                    <MessageItem
                      key={i}
                      id={i}
                      item={item}
                      onClick={toggleMessage}
                      isOpen={openId === i}
                    />
                  ))
              )}

            </div>
          </div>

        </>
      )
      }


    </>
  )
}

export default MessagesList
