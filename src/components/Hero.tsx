"use client"
import React, { useState } from 'react'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
const Hero = () => {
  const [searchText, setSearchText] = useState('')
  return (
    <main className='flex items-center h-full justify-center flex-col gap-3'>
      <h1 className='text-4xl font-bold text-secondary tracking-wider'>RecipeSwap</h1>
      <p className="mb-1 text-center">Share your recipes and search for the best ones.</p>
      <div className='flex items-center gap-3'>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-secondary rounded-md focus:outline-secondary w-full h-10 p-2"
          type="text"
          placeholder="Search for a recipe"
        />
        <BsFillArrowRightCircleFill className=' cursor-pointer text-accent w-12 h-12 hover:text-[#5ba1ca]' />
      </div>
    </main>
  )
}

export default Hero