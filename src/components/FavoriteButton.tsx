"use client";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useSupabase } from "./supabase-provider";

export type recipesInfoProps = {
  title: string;
  readInMinutes: number;
  servings: number;
  image: string;
  summary: string;
  instructions: string;
};

const FavoriteButton = ({ recipesInfo }: { recipesInfo: any }) => {
  const { supabase, session } = useSupabase();
  const [isFavoriting, setIsFavoriting] = useState(false);
  console.log(recipesInfo.name);

  async function addToFavorites(recipe: string) {
    let new_element = recipe;
    let id = session?.user.id;

    try {
      setIsFavoriting(true);
      let { data, error } = await supabase.rpc("append_array", {
        id,
        new_element,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsFavoriting(false);
    }
  }

  return (
    <button
      onClick={() => addToFavorites(recipesInfo.name)}
      // disabled={true}
      className=" flex items-center justify-center rounded text-white bg-accent w-full py-2"
    >
      <AiOutlineHeart size={28} color="white" />
      Add to Favorites
    </button>
  );
};

export default FavoriteButton;
