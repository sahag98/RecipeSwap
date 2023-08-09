"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import { Button } from "./ui/button";

type editRecipeProps = {
  id: number;
};

export default function DeleteRecipe({ id }: editRecipeProps) {
  let [isOpen, setIsOpen] = useState(false);
  const { supabase, session } = useSupabase();
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function deleteRecipe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setDeleting(true);

      if (!session) {
        throw new Error("You need to be signed in.");
      }

      const { error } = await supabase.from("recipes").delete().eq("id", id);
      if (error) {
        throw error;
      }
      toast.success("Successfully deleted recipe.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setDeleting(false);
      closeModal();
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="border-secondary outline-none cursor-pointer border p-1 rounded-md hover:bg-secondary hover:text-white transition"
        >
          <MdClose className="w-5 h-5" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-secondary"
                  >
                    Delete Recipe
                  </Dialog.Title>
                  <form
                    onSubmit={deleteRecipe}
                    className="w-full flex flex-col justify-between gap-3 rounded-md p-2"
                  >
                    <p className="text-center">
                      Are you sure you want to delete this recipe?
                    </p>
                    <Button type="submit" variant={"destructive"}>
                      {deleting ? "Deleting" : "Delete"}
                    </Button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
