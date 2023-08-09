"use client";
import React, { Fragment, useState } from "react";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

type likeProps = {
  recipeId: number;
  userId: string | null;
  isLikedByMe: boolean;
  likes:
    | {
        created_at: string | null;
        id: number;
        recipe_id: number | null;
        user_id: string | null;
      }[]
    | null;
};

const Likes = ({ recipeId, userId, likes, isLikedByMe }: likeProps) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { supabase, session } = useSupabase();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log({ error });
    }
    closeModal();
  };

  async function toggleLike() {
    if (!session?.user) {
      openModal();
      return;
    }

    if (isLikedByMe) {
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", userId);
      toast.error("Successfully disliked recipe.");
    } else {
      const { data, error } = await supabase.from("likes").insert({
        recipe_id: recipeId,
        user_id: userId,
      });

      if (error) {
        console.log(error);
      }
      toast.success("Successfully liked recipe.");
    }
    router.refresh();
  }

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-secondary"
                  >
                    You need to be Signed In
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      In order to like a recipe you need to be signed in with
                      your google account.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={handleGoogleLogin}
                      className="inline-flex w-full items-center justify-center rounded-md bg-accent bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <h2 className="text-accent font-semibold flex items-center gap-2">
                        <span>
                          <FcGoogle className="w-7 h-7" />
                        </span>
                        Sign In
                      </h2>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <button className="flex items-center gap-1" onClick={toggleLike}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className={
            "w-6 h-6 lg:hover:fill-red-400 md:hover:fill-red-400 transition " +
            (isLikedByMe ? "fill-red-500" : "")
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span className="dark:text-foreground">{likes?.length}</span>
      </button>
    </>
  );
};

export default Likes;
