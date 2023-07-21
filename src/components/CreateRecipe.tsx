"use client";
import React, { useState } from "react";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";
import CustomFilter from "./CustomFilter";
import { cuisines, diets } from "@/constants";
import { BiImage } from "react-icons/bi";
import { AiFillCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";
import RecipeFilters from "./RecipeFilters";
import DietFilter from "./DietFilter";

const CreateRecipe = () => {
  const { supabase, session } = useSupabase();
  const [recipeName, setRecipeName] = useState("");
  const [summary, setSummary] = useState("");
  const [instructions, setInstructions] = useState("");
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
      if (!file) {
        throw new Error("You must select an image to upload.");
      }

      if (!session) {
        throw new Error("You need to be signed in.");
      }

      const fileExt = file.name.split(".").pop();

      console.log(fileExt);
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

      console.log("public url", imageData.signedUrl);

      const { data, error } = await supabase.from("recipes").insert({
        name: recipeName,
        instructions: instructions,
        servings: servings,
        readyInMinutes: readyIn,
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
      setServings(0);
      setInstructions("");
      setFile(null);
      router.refresh();

      // console.log("Image uploaded and inserted into recipe table:", data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col bg-gray-200 p-3 gap-3 rounded-md"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="recipeName" className="font-medium text-secondary">
          Enter recipe name
        </label>
        <input
          name="recipeName"
          className="rounded-md text-sm p-2 outline-none"
          type="text"
          placeholder="Chicken Shawerma"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="recipeName" className="font-medium text-secondary">
          Enter summary
        </label>
        <textarea
          name="summary"
          className=" rounded-md p-2 h-20 text-sm outline-none "
          placeholder="Enter Summary of Recipe"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="instructions" className="font-medium text-secondary">
          Enter Instructions
        </label>
        <textarea
          name="instructions"
          className=" rounded-md p-2 h-20 text-sm outline-none"
          placeholder="Enter Instructions of Recipe"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="servings" className="font-medium text-secondary">
          Enter number of servings
        </label>
        <input
          name="servings"
          className=" rounded-md p-2 text-sm outline-none"
          type="number"
          placeholder="Enter number of servings"
          value={servings}
          onChange={(e) => setServings(e.target.valueAsNumber)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="time" className="font-medium text-secondary">
          Enter ready in time
        </label>
        <input
          name="time"
          className=" rounded-md p-2 text-sm outline-none"
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
          <div className="h-60 cursor-pointer bg-accent/20 p-8 flex rounded-lg flex-col justify-center items-center">
            <p className="font-bold text-4xl">
              <AiOutlineCloudUpload />
            </p>
            <p>Click to upload</p>
            <input
              type="file"
              name="upload-image"
              className="w-0 h-0"
              accept=".png,.jpeg,.jpg"
              onChange={handleFileChange}
            />
          </div>
        )}
        {file && (
          <>
            <div className="h-96 cursor-pointer relative bg-[#d5d8d8]flex flex-col justify-center items-center">
              <Image
                className="w-full h-full rounded-lg object-cover"
                src={URL.createObjectURL(file)}
                alt="image-preview"
                width={500}
                height={500}
              />
            </div>
          </>
        )}
      </label>
      <button className="bg-accent p-3 text-white rounded-md">
        {uploading ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};

export default CreateRecipe;
