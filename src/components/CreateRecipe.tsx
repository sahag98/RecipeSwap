"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useSupabase } from "./supabase-provider";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { cuisines, diets } from "@/constants";
import { AiOutlineCloudUpload } from "react-icons/ai";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import RecipeFilters from "./RecipeFilters";
import DietFilter from "./DietFilter";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });
// const QuillNoSSRWrapper = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
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

const CreateRecipe = () => {
  const { supabase, session } = useSupabase();
  const [recipeName, setRecipeName] = useState("");
  const [summary, setSummary] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState(cuisines[0]);
  const [diet, setDiet] = useState(diets[0]);
  const [servings, setServings] = useState(0);
  const [readyIn, setReadyIn] = useState(0);
  const [file, setFile] = useState<any>(null);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setUploading(true);
      if (!file) {
        throw new Error("You must select an image to upload.");
      }

      if (!session) {
        throw new Error("You need to be signed in.");
      }

      const fileExt = file.name.split(".").pop();

      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("recipe")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: imageData, error: getUrlError } = await supabase.storage
        .from("recipe")
        .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year expiry

      if (getUrlError) {
        throw getUrlError;
      }

      const { data, error } = await supabase.from("recipes").insert({
        name: recipeName,
        instructions: instructions,
        servings: servings,
        readyInMinutes: readyIn,
        ingredients: ingredients,
        summary: summary,
        user_id: session?.user.id,
        cuisine,
        diet,
        image: imageData.signedUrl,
      });

      if (error) {
        throw error;
      }
      setSummary("");
      setReadyIn(0);
      setRecipeName("");
      setIngredients("");
      setServings(0);
      setInstructions("");
      setFile(null);
      toast.success("Recipe created.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col bg-gray-200 dark:bg-primary-foreground my-3 p-3 gap-3 rounded-md"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="recipeName" className="font-medium text-sm">
          Recipe Name
        </label>
        <Input
          name="recipeName"
          required
          type="text"
          placeholder="Chicken Shawerma"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="recipeName" className="font-medium text-sm ">
          Summary (Optional)
        </label>
        <Textarea
          name="summary"
          placeholder="For the best results, it’s best to marinate the chicken overnight."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="instructions" className="font-medium text-sm ">
          Ingredients
        </label>
        <QuillNoSSRWrapper
          className="bg-primary dark:bg-background dark:placeholder:text-muted-foreground rounded-md"
          modules={modules}
          placeholder="Chicken, olive oil, lemon"
          value={ingredients}
          onChange={setIngredients}
          formats={formats}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="instructions" className="font-medium text-sm ">
          Instructions
        </label>
        <QuillNoSSRWrapper
          className="bg-primary dark:bg-background rounded-md"
          modules={modules}
          placeholder="Mix marinade"
          value={instructions}
          onChange={setInstructions}
          formats={formats}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="servings" className="font-medium text-sm ">
          Number of Servings (Optional)
        </label>
        <Input
          name="servings"
          type="number"
          placeholder="Enter number of servings"
          value={servings}
          onChange={(e) => setServings(e.target.valueAsNumber)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="time" className="font-medium text-sm">
          Ready in Time (Optional)
        </label>
        <Input
          name="time"
          type="number"
          placeholder="Enter the ready in time"
          value={readyIn}
          onChange={(e) => setReadyIn(e.target.valueAsNumber)}
        />
      </div>
      <div className="flex gap-3 lg:justify-normal justify-between">
        <RecipeFilters
          cuisine={cuisine}
          setCuisine={setCuisine}
          title="cuisines"
          options={cuisines}
        />
        <DietFilter
          diet={diet}
          setDiet={setDiet}
          title="diets"
          options={diets}
        />
      </div>
      <label>
        {!file && (
          <div className="h-60 cursor-pointer bg-primary dark:bg-background p-8 flex rounded-lg flex-col justify-center items-center">
            <p className="font-bold dark:text-foreground text-4xl">
              <AiOutlineCloudUpload />
            </p>
            <p className="dark:text-foreground">Click to upload (Required)</p>
            <input
              type="file"
              name="upload-image"
              required
              className="w-0 h-0"
              accept=".png,.jpeg,.jpg .webp"
              onChange={handleFileChange}
            />
          </div>
        )}
        {file && (
          <>
            <div className="h-96 cursor-pointer relative bg-[#d5d8d8]flex flex-col justify-center items-center">
              <Image
                className="w-full h-full rounded-lg object-contain bg-slate-100"
                src={URL.createObjectURL(file)}
                alt="image-preview"
                width={500}
                height={500}
                onClick={() => setFile(null)}
              />
            </div>
          </>
        )}
      </label>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          onClick={() => router.push("/recipes")}
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button type="submit">{uploading ? "Submitting..." : "Submit"}</Button>
      </div>
    </form>
  );
};

export default CreateRecipe;
