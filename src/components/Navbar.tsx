"use client"
import React, { Fragment } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import {BsChevronDown} from 'react-icons/bs'
import {RxExit} from 'react-icons/rx'
import {BiFoodMenu,BiStar} from 'react-icons/bi'

const Navbar = () => {
  const { data: session, status } = useSession()
 

  return (
   <nav className='py-4 relative flex items-center justify-between border-b  border-[#f6d7d9]'>
    <Link href='/'>
    <h1 className='font-bold text-lg lg:text-2xl'>RecipeSwap</h1>
    </Link>
    <ul className=' hidden lg:flex items-center gap-5'>
      <Link href='/recipes'>
      <li className='font-medium text-sm lg:text-base text-secondary'>
        Recipes
      </li>
      </Link>
      <Link href="/favorites">
      <li className='font-medium text-sm lg:text-base text-secondary'>
        Favorites
      </li>
      </Link>
    </ul>
    <div className="z-20 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {status == 'authenticated' ? 
          <Menu.Button className="inline-flex w-full items-center justify-center rounded-md bg-accent bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
           <Image src={session?.user?.image} width={32} height={32} alt='' className='rounded-full' />
            <BsChevronDown className="ml-2 -mr-1 text-accent h-5 w-5"
              aria-hidden="true" />
          </Menu.Button>
          :
          <button onClick={()=>signIn('google')} className="inline-flex w-full items-center justify-center rounded-md bg-accent bg-opacity-20 px-4 py-3 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <h2 className='text-accent font-semibold'>Sign In</h2>
         </button>
          }
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-[#e0e0e0] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2 ">
            <Link href='/recipes'>
            <Menu.Item as='div' className='lg:hidden'>
                {({ active }) => (
                  <button
                  
                    className={`${
                      active ? 'bg-accent text-white text-base font-medium' : 'text-gray-900'
                    } group flex w-full items-center rounded-md  text-base px-2 py-2 font-medium`}
                  >
                    {active ? (
                      <BiFoodMenu className='mr-4 h-6 w-6' />
                    ) : (
                      <BiFoodMenu className='mr-4 h-6 w-6' />
                    )}
                    Recipes
                  </button>
                )}
              </Menu.Item>
              </Link>
              <Link href='/favorites'>
              <Menu.Item as='div' className='lg:hidden'>
                {({ active }) => (
                  <button
                  
                   className={`${
                    active ? 'bg-accent text-white font-medium' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 font-medium`}
                  >
                    {active ? (
                     <BiStar className='mr-4 h-6 w-6' />
                    ) : (
                      <BiStar className='mr-4 h-6 w-6' />
                    )}
                    Favorites
                  </button>
                )}
              </Menu.Item>
              </Link>
              <Menu.Item>
                {({ active }) => (
                  
                  <button
                   onClick={()=>signOut()}
                   className={`${
                    active ? 'bg-accent text-white font-medium' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 font-medium`}
                  >
                    {active ? (
                     <RxExit className='mr-4 h-6 w-6' />
                    ) : (
                      <RxExit className='mr-4 h-6 w-6' />
                    )}
                    Sign Out
                  </button>
                )}
              </Menu.Item>
              
          
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
   </nav>

  )
}

export default Navbar
