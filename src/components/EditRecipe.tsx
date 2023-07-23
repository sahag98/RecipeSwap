"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

type editRecipeProps = {
  image: string;
  instructions: string;
  name: string;
  mins: number;
  servings: number;
  summary: string;
  userId: string;
};

export default function EditRecipe({
  name,
  mins,
  summary,
  instructions,
  servings,
  image,
  userId,
}: editRecipeProps) {
  let [isOpen, setIsOpen] = useState(false);

  const [newRecipeName, setNewRecipeName] = useState(name);
  const [newSummary, setNewSummary] = useState(summary);
  const [newInstructions, setNewInstructions] = useState(instructions);
  const [newServings, setNewServings] = useState(servings);
  const [newReadyIn, setNewReadyIn] = useState(mins);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="border-accent outline-none cursor-pointer border p-1 rounded-md hover:bg-accent hover:text-white transition"
        >
          <FiEdit2 className="lg:w-5 lg:h-5" />
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
                    className="text-lg font-medium leading-6 text-secondary"
                  >
                    Edit Recipe
                  </Dialog.Title>
                  <form className="w-full flex flex-col gap-2 bg-gray-200 rounded-md p-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="recipeName"
                        className="font-medium text-secondary"
                      >
                        Edit name
                      </label>
                      <input
                        name="recipeName"
                        className="rounded-md text-sm p-2 outline-none"
                        type="text"
                        placeholder="Chicken Shawerma"
                        value={newRecipeName}
                        onChange={(e) => setNewRecipeName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="recipeName"
                        className="font-medium text-secondary"
                      >
                        Edit summary
                      </label>
                      <textarea
                        name="summary"
                        className=" rounded-md p-2 h-20 text-sm outline-none "
                        placeholder="Enter Summary of Recipe"
                        value={newSummary}
                        onChange={(e) => setNewSummary(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="instructions"
                        className="font-medium text-secondary"
                      >
                        Edit Instructions
                      </label>
                      <textarea
                        name="instructions"
                        className=" rounded-md p-2 h-20 text-sm outline-none"
                        placeholder="Enter Instructions of Recipe"
                        value={newInstructions}
                        onChange={(e) => setNewInstructions(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="servings"
                        className="font-medium text-secondary"
                      >
                        Edit number of servings
                      </label>
                      <input
                        name="servings"
                        className=" rounded-md p-2 text-sm outline-none"
                        type="number"
                        placeholder="Enter number of servings"
                        value={newServings}
                        onChange={(e) => setNewServings(e.target.valueAsNumber)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="time"
                        className="font-medium text-secondary"
                      >
                        Edit ready in time
                      </label>
                      <input
                        name="time"
                        className=" rounded-md p-2 text-sm outline-none"
                        type="number"
                        placeholder="Enter the ready in time"
                        value={newReadyIn}
                        onChange={(e) => setNewReadyIn(e.target.valueAsNumber)}
                      />
                    </div>
                  </form>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
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
