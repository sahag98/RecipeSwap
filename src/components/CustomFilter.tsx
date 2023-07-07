"use client"
import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from "@headlessui/react";

import { useRouter } from "next/navigation";
import {BsChevronDown} from 'react-icons/bs'
import { updateSearchParams } from '@/utils';


const CustomFilter = ({options, title}) => {
 
  const [selected, setSelected] = useState(options[0])
  const router = useRouter();

  const handleUpdateParams = (e: {e:any}) => {
    console.log(e)
    const newPathName = updateSearchParams(title,e);
 
    router.push(newPathName);
  };
  return (
    <div>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); // Update the selected option in state
          handleUpdateParams(e); // Update the URL search parameters and navigate to the new URL
        }}
      >
        <div className='rounded-md  z-10'>
          {/* Button for the listbox */}
          <Listbox.Button className='flex items-center justify-between p-2 rounded-md border border-accent w-fit'>
            <span className='block truncate font-medium mr-2'>{selected}</span>
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
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-accent text-white cursor-pointer" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                        {option}
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