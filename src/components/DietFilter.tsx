"use client";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { useRouter } from "next/navigation";
import { BsChevronDown } from "react-icons/bs";
import { updateSearchParams } from "@/utils";

type CustomFilterProps = {
  options: string[];
  title: string;
  diet: string;
  setDiet: React.Dispatch<React.SetStateAction<string>>;
};

const DietFilter = ({ options, diet, setDiet }: CustomFilterProps) => {
  return (
    <div>
      <Listbox
        value={diet}
        onChange={(e) => {
          setDiet(e); // Update the selected option in state
        }}
      >
        <div className="rounded-md z-10">
          {/* Button for the listbox */}
          <Listbox.Button className="flex lg:w-44 w-40 items-center justify-between p-2 rounded-md border bg-[#f2f2f2] border-accent">
            <span className="block truncate font-medium mr-2">
              {diet ? diet : options[0]}
            </span>
            <BsChevronDown className="text-accent" />
          </Listbox.Button>
          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className=" lg:w-44 w-40 h-44 overflow-y-auto border rounded-md border-accent">
              {/* Map over the options and display them as listbox options */}
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active
                        ? "bg-accent text-white cursor-pointer"
                        : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
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
  );
};

export default DietFilter;
