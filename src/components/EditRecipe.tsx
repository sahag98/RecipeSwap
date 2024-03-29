"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

type editRecipeProps = {
  id: number;
  image: string;
  instructions: string;
  ingredients: string | null;
  name: string;
  mins: number | null;
  servings: number | null;
  summary: string | null;
  userId: string;
};

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

export default function EditRecipe({
  id,
  name,
  mins,
  summary,
  ingredients,
  instructions,
  servings,
  image,
  userId,
}: editRecipeProps) {
  let [isOpen, setIsOpen] = useState(false);
  const { supabase, session } = useSupabase();
  const [newRecipeName, setNewRecipeName] = useState(name);
  const [newSummary, setNewSummary] = useState(summary ? summary : "");
  const [newIngredients, setNewIngredients] = useState(
    ingredients ? ingredients : ""
  );
  const [newInstructions, setNewInstructions] = useState(instructions);
  const [newServings, setNewServings] = useState(servings ? servings : 0);
  const [newReadyIn, setNewReadyIn] = useState(mins ? mins : 0);
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function editRecipe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setEditing(true);

      if (!session) {
        throw new Error("You need to be signed in.");
      }

      const { data, error } = await supabase
        .from("recipes")
        .update({
          name: newRecipeName,
          instructions: newInstructions,
          servings: newServings,
          readyInMinutes: newReadyIn,
          summary: newSummary,
        })
        .eq("id", id);
      if (error) {
        throw error;
      }
      toast.success("Successfully edited recipe.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setEditing(false);
      closeModal();
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="border-accent outline-none cursor-pointer border p-1 rounded-md hover:bg-accent hover:text-white transition"
        >
          <FiEdit2 className="w-5 h-5" />
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
                <Dialog.Panel className="w-full max-w-lg relative transform overflow-hidden rounded-2xl bg-white dark:bg-primary-foreground p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-center leading-6 text-secondary"
                  >
                    Edit Recipe
                  </Dialog.Title>

                  <form
                    onSubmit={editRecipe}
                    className="w-full flex flex-col mt-2 gap-2 bg-gray-200 rounded-md bg-primary-foreground p-3"
                  >
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="recipeName"
                        className="font-medium text-secondary"
                      >
                        Edit Name
                      </label>
                      <Input
                        autoFocus
                        name="recipeName"
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
                        Edit Summary
                      </label>
                      <Textarea
                        name="summary"
                        placeholder="Enter Summary of Recipe"
                        value={newSummary!}
                        onChange={(e) => setNewSummary(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="instructions"
                        className="font-medium text-secondary"
                      >
                        Edit Ingredients
                      </label>
                      <QuillNoSSRWrapper
                        className="bg-background dark:bg-background rounded-md"
                        modules={modules}
                        value={newIngredients}
                        onChange={setNewIngredients}
                        formats={formats}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="instructions"
                        className="font-medium text-secondary"
                      >
                        Edit Instructions
                      </label>
                      <QuillNoSSRWrapper
                        className="bg-primary dark:bg-background rounded-md"
                        modules={modules}
                        value={newInstructions}
                        onChange={setNewInstructions}
                        formats={formats}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="servings"
                        className="font-medium text-secondary"
                      >
                        Edit number of servings
                      </label>
                      <Input
                        name="servings"
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
                      <Input
                        name="time"
                        type="number"
                        placeholder="Enter the ready in time"
                        value={newReadyIn}
                        onChange={(e) => setNewReadyIn(e.target.valueAsNumber)}
                      />
                    </div>
                    <div className="flex justify-end mt-1 space-x-2">
                      <Button
                        type="button"
                        onClick={closeModal}
                        disabled={editing}
                        variant={"outline"}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={editing}>
                        {editing ? "Confirming..." : "Confirm"}
                      </Button>
                    </div>
                  </form>

                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
