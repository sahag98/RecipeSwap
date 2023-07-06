"use client"
import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from "@headlessui/react";
import { cuisines } from '@/constants'
import { useRouter } from "next/navigation";
import {BsChevronDown} from 'react-icons/bs'
import { updateSearchParams } from '@/utils';


const CustomFilter = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('')
  const router = useRouter();

  const handleUpdateParams = (e: {e:any}) => {
    console.log(e)
    const newPathName = updateSearchParams('cuisines',e);
 
    router.push(newPathName);
  };
  return (
    <div className='absolute right-0 mr-3'>
      <Listbox
        value={selectedCuisine}
        onChange={(e) => {
          setSelectedCuisine(e); // Update the selected option in state
          handleUpdateParams(e); // Update the URL search parameters and navigate to the new URL
        }}
      >
        <div className='  rounded-md w-fit z-10'>
          {/* Button for the listbox */}
          <Listbox.Button className='flex items-center justify-between p-2 rounded-md border border-accent w-40'>
            <span className='block truncate font-medium'>{selectedCuisine ? selectedCuisine : 'Select Cuisine'}</span>
            <BsChevronDown />
            {/* <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron_up-down' /> */}
          </Listbox.Button>
          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='w-40 bg-slate-100 border rounded-md border-accent'>
              {/* Map over the options and display them as listbox options */}
              {cuisines.map((cuisine) => (
                <Listbox.Option
                  key={cuisine}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-accent text-white cursor-pointer" : "text-gray-900"
                    }`
                  }
                  value={cuisine}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                        {cuisine}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter