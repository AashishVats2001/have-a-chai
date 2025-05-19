"use client"

import React, { useState } from 'react'
import FAQData from '@/app/data/FAQData'
import FAQItem from './FAQItem'

const FAQList = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto p-4">
      {FAQData.map((item) => (
        <FAQItem
          key={item.id}
          item={item}
          onClick={toggleFAQ}
          isOpen={openId === item.id}
        />
      ))}
    </div>
  );
};

export default FAQList
