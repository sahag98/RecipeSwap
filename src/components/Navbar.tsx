"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const { data: session, status } = useSession()
  console.log(status)
  return (
    <nav className="w-full z-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href='/' className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap cursor-pointer dark:text-white">RecipeSwap</span>
        </Link>
        <div className="flex md:order-2">
        {status === 'authenticated' ?
        <div className='flex items-center gap-3'>
        <Image className='rounded-full' src={session?.user?.image} width={40} height={40} />
        <button
            type="button"
            onClick={() => signOut()}
            className="text-accent border border-accent font-medium rounded-lg h-10 text-sm px-4 text-center mr-3 md:mr-0">
            Log out
          </button>
          </div>
        :
        <button
            type="button"
            onClick={() => signIn("google")}
            className="text-white bg-accent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
            Login
          </button>
        }
          
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <Link href="/" className='block py-2 pl-3 pr-4 text-secondary rounded md:bg-transparent md:p-0'>
              Home
            </Link>
            <Link href="/recipes" className='block py-2 pl-3 pr-4 text-secondary rounded md:bg-transparent md:p-0'>
              Recipes
            </Link>
            <Link href="/favorites" className='block py-2 pl-3 pr-4 text-secondary rounded md:bg-transparent md:p-0'>
              Your favorites
            </Link>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar