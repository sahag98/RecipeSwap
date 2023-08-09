"use client";
import React, { Fragment, useState } from "react";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from "react-icons/bs";

type saveProps = {
  recipeId: number;
  userId: string | null;
  isSavedByMe: boolean;
  saves:
    | {
        created_at: string | null;
        id: number;
        recipe_id: number | null;
        user_id: string | null;
      }[]
    | null;
};

const Save = ({ recipeId, userId, saves, isSavedByMe }: saveProps) => {
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

  async function toggleSave() {
    if (!session?.user) {
      openModal();
      return;
    }

    if (isSavedByMe) {
      const { data, error } = await supabase
        .from("favorites")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", userId);
      toast.error("Successfully unfavorited recipe.");
    } else {
      const { data, error } = await supabase.from("favorites").insert({
        recipe_id: recipeId,
        user_id: userId,
      });

      if (error) {
        console.log(error);
      }
      toast.success("Successfully favorited.");
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

      <button className="flex items-center gap-1" onClick={toggleSave}>
        {isSavedByMe ? (
          <BsFillBookmarkDashFill className="w-5 h-5 text-secondary hover:text-secondary/80 transition" />
        ) : (
          <BsFillBookmarkPlusFill className="w-5 h-5 text-accent hover:text-accent/80 transition" />
        )}

        {saves?.length}
      </button>
    </>
  );
};

export default Save;
