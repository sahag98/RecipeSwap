"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useSupabase } from "./supabase-provider";
import Image from "next/image";

import { Menu, Transition } from "@headlessui/react";
import { BsChevronDown, BsFillPersonFill } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";

import { AiOutlinePlus } from "react-icons/ai";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const Navbar = ({ avatar }: any) => {
  const { supabase, session } = useSupabase();
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log({ error });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  return (
    <nav className="lg:py-2 lg:px-0 py-2 px-4 relative flex items-center justify-between">
      <Link href="/">
        <h1 className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-sky-300 to-red-400 bg-clip-text text-transparent">
          RS
        </h1>
      </Link>
      <ul className="flex items-center gap-5">
        <Link href="/recipes">
          <li
            id="#Recipes"
            className="font-medium hover:text-accent transition text-md lg:text-base text-secondary"
          >
            Recipes
          </li>
        </Link>
        {session?.user && (
          <Link className="hidden lg:flex" href="/create">
            <li className="font-medium hover:text-accent text-sm lg:text-base text-secondary">
              Create Recipe
            </li>
          </Link>
        )}
      </ul>
      <div className="z-20 text-right flex items-center gap-2">
        <ModeToggle />
        <Menu as="div" className="relative inline-block text-left">
          <div>
            {session ? (
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-md  px-2 py-2 text-sm font-medium text-accent transition hover:bg-accent dark:hover:bg-primary-foreground hover:text-white focus:outline-none ">
                <Image
                  src={avatar[0].avatar_url}
                  width={30}
                  height={30}
                  alt="profile photo"
                  className="rounded-full border w-9 h-9 object-cover"
                />
                <BsChevronDown
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            ) : (
              <Button onClick={handleGoogleLogin} data-cy="submit">
                <h2 className=" font-semibold flex items-center gap-2">
                  <span>
                    <FcGoogle className="w-7 h-7" />
                  </span>
                  Sign In
                </h2>
              </Button>
            )}
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
            <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-primary shadow-lg shadow-secondary-shadow dark:shadow-none dark:bg-primary-foreground  ring-opacity-2 focus:outline-none">
              <div className="p-2 ">
                <Link href="/create">
                  <Menu.Item as="div" className="mb-2 lg:hidden">
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-accent dark:bg-background dark:text-accent text-white font-medium"
                            : "bg-accent/25 text-accent"
                        } group flex w-full transition items-center rounded-lg px-2 py-3 font-medium`}
                      >
                        {active ? (
                          <AiOutlinePlus className="mr-4 h-6 w-6" />
                        ) : (
                          <AiOutlinePlus className="mr-4 h-6 w-6" />
                        )}
                        Create Recipe
                      </button>
                    )}
                  </Menu.Item>
                </Link>
                <Link href="/profile">
                  <Menu.Item as="div" className="mb-2">
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-accent dark:bg-background dark:text-accent text-white text-base font-medium"
                            : "text-secondary"
                        } group flex w-full transition items-center rounded-md  text-base px-2 py-3 font-medium`}
                      >
                        {active ? (
                          <BsFillPersonFill className="mr-4 h-6 w-6" />
                        ) : (
                          <BsFillPersonFill className="mr-4 h-6 w-6" />
                        )}
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                </Link>
                {/* <Link href="/favorites">
                  <Menu.Item as="div" className="mb-2">
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-accent text-white font-medium"
                            : "text-secondary"
                        } group flex w-full items-center rounded-md px-2 py-2 font-medium`}
                      >
                        {active ? (
                          <BiStar className="mr-4 h-6 w-6" />
                        ) : (
                          <BiStar className="mr-4 h-6 w-6" />
                        )}
                        Favorites (Coming Soon)
                      </button>
                    )}
                  </Menu.Item>
                </Link> */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active
                          ? "bg-accent dark:bg-background dark:text-secondary text-white font-medium"
                          : "text-secondary"
                      } group flex transition w-full items-center rounded-md px-2 py-3 font-medium`}
                    >
                      {active ? (
                        <RxExit className="mr-4 h-6 w-6" />
                      ) : (
                        <RxExit className="mr-4 h-6 w-6" />
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
  );
};

export default Navbar;
