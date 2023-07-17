"use client";
import React, { useState } from "react";
import { useSupabase } from "./supabase-provider";

const CreateRecipe = () => {
  const { supabase, session } = useSupabase();
  const [recipeName, setRecipeName] = useState("");
  const [summary, setSummary] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState(0);
  const [readyIn, setReadyIn] = useState(0);
  // const [image, setImage] = useState("");

  async function handleAddRecipe(e: any) {
    e.preventDefault();
    const { error } = await supabase.from("recipes").insert({
      name: recipeName,
      instructions: instructions,
      servings: servings,
      readyInMinutes: readyIn,
      summary: summary,
      user_id: session?.user.id,
    });
    if (error) throw error;
    setSummary("");
    setReadyIn(0);
    setRecipeName("");
    setServings(0);
    setInstructions("");
  }

  return (
    <form onSubmit={handleAddRecipe} className="flex flex-col gap-3">
      <input
        className="border border-secondary rounded-md p-2"
        type="text"
        placeholder="Enter Recipe Name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <textarea
        className="border border-secondary rounded-md p-2"
        placeholder="Enter Summary of Recipe"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <textarea
        className="border border-secondary rounded-md p-2"
        placeholder="Enter Instructions of Recipe:"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <input
        className="border border-secondary rounded-md p-2"
        type="number"
        placeholder="Enter number of servings"
        value={servings}
        onChange={(e) => setServings(e.target.valueAsNumber)}
      />
      <input
        className="border border-secondary rounded-md p-2"
        type="number"
        placeholder="Enter the ready in time"
        value={readyIn}
        onChange={(e) => setReadyIn(e.target.valueAsNumber)}
      />
      <button className="bg-accent p-2 text-white rounded-md">Submit</button>
    </form>
  );
};

export default CreateRecipe;
