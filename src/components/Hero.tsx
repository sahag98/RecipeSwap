"use client"
import React, { useState } from 'react'

const Hero = () => {
  const [searchText, setSearchText] = useState('')
  return (
    <main className='flex items-center justify-center flex-col gap-3'>
      <h1 className='text-4xl font-bold text-secondary'>RecipeSwap</h1>
      <p className=" text-center">Share your unique recipes with people worldwide and search for the best recipes.</p>
      <div className='flex items-center w-3/4'>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-secondary rounded-md focus:outline-secondary w-full h-10 p-2"
          type="text"
          placeholder="Search for a recipe"
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#4C86A8" className="cursor-pointer hover:text-secondary w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </main>
  )
}

export default Hero