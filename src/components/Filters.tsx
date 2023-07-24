"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiFilter } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";
import CustomFilter from "./CustomFilter";
import { cuisines, diets } from "@/constants";

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const cuisineParam = searchParams.get("cuisines");
  const dietParam = searchParams.get("diets");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="absolute right-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center border text-accent border-accent p-2 rounded-md hover:bg-accent transition hover:text-white gap-2 cursor-pointer"
        >
          <span className=" font-medium">Filters</span>
          <FiFilter className="w-6 h-6" />
        </button>
        {!cuisineParam || !dietParam ? (
          ""
        ) : (
          <button
            type="button"
            onClick={() => router.replace("/recipes")}
            className="flex items-center bg-accent justify-between p-2 rounded-md hover:bg-opacity-75 transition cursor-pointer"
          >
            <span className="text-white font-medium">Clear filters</span>
            <MdOutlineClear className="w-6 h-6 text-white" />
          </button>
        )}
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

          <div className="fixed inset-0 bg overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-white/30 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-secondary"
                  >
                    Filters
                  </Dialog.Title>
                  <div className="mt-2 flex items-start justify-between">
                    <CustomFilter title="cuisines" options={cuisines} />
                    <CustomFilter title="diets" options={diets} />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-accent/90 px-4 py-2 text-sm font-medium transition hover:bg-accent text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
  );
}
