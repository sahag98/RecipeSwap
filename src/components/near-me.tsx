"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "./ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  location: z.string().min(1),
});

const NearMe = ({ recipe }: { recipe: string }) => {
  let [isOpen, setIsOpen] = useState(false);
  // const [location, setLocation] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  const handleOpenMaps = async (values: z.infer<typeof formSchema>) => {
    // Replace 'your+location' with the user's location or a default location if needed
    const mapsURL = `https://www.google.com/maps/search/${recipe}+${values.location}`;

    // Open the Google Maps URL in a new tab
    window.open(mapsURL, "_blank");
    form.reset();
    closeModal();
  };

  return (
    <div>
      <button
        className="underline text-accent text-sm font-medium"
        onClick={() => setIsOpen(true)}
      >
        Find the nearest {recipe} restaurant
      </button>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl dark:bg-primary-foreground bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-secondary"
                  >
                    Enter Location
                  </Dialog.Title>
                  <div className="mt-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter your location to locate the nearest {recipe} place
                      near you.
                    </p>
                  </div>
                  <Form {...form}>
                    <form
                      className="mt-2"
                      onSubmit={form.handleSubmit(handleOpenMaps)}
                    >
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Enter location" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <button className="inline-flex mt-2 w-full items-center justify-center rounded-md bg-accent bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        Search on Google Maps
                      </button>
                    </form>
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NearMe;
