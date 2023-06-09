"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {FiFilter} from 'react-icons/fi'
import CustomFilter from './CustomFilter'
import { cuisines, diets } from '@/constants'

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false)
  const [filtersSelected, setfiltersSelected] = useState(null)
  function closeModal() {
    setIsOpen(false)

  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="absolute right-0  flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center bg-accent bg-opacity-0 p-2 rounded-md hover:bg-opacity-20 gap-2 cursor-pointer"
        >
          <span className='text-accent'>Filters</span>
          <FiFilter className='w-6 h-6 text-accent' />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-[#adadad] shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Filters
                  </Dialog.Title>
                  <div className="mt-2 flex items-start justify-between">
                    <CustomFilter title="cuisines" options={cuisines} />
                    <CustomFilter title="diets"  options={diets} />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
