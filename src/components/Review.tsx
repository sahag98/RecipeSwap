"use client";
import React, { Fragment, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";

const Review = ({ RecipeId }: any) => {
  const { supabase, session } = useSupabase();
  const [comment, setComment] = useState("");
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log({ error });
    }
    closeModal();
  };

  async function addReview(e: any) {
    e.preventDefault();
    if (!session?.user) {
      openModal();
      return;
    }

    try {
      const { data, error } = await supabase.from("reviews").insert({
        recipe_id: RecipeId,
        user_id: session?.user.id,
        review: comment,
      });

      setComment("");
      toast.success("Review added successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
    }
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
                      In order to write a review you need to be signed in with
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
      <div>
        <form
          onSubmit={addReview}
          className="flex items-center justify-between gap-3"
        >
          <input
            required
            className="bg-secondary/20 outline-none text-sm rounded-md w-full px-2 py-3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a review..."
          />
          <button className="bg-accent hover:bg-accent/90 transition rounded-full p-3 text-white">
            <AiOutlineSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Review;
