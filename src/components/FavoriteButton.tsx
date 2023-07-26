"use client";
import React from "react";
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

const FavoriteButton = () => {
  const { supabase, session } = useSupabase();

  async function addToFavorites(recipe: string) {
    console.log("adding to favorites");

    let new_element = recipe;
    let { data, error } = await supabase.rpc("append_array", {
      id: session?.user.id,
      new_element,
    });
    if (error) throw error;
  }

  return (
    <button
      // onClick={() => addToFavorites(recipesInfo.title)}
      disabled={true}
      className=" flex items-center justify-center rounded text-white bg-accent w-full py-2"
    >
      <AiOutlineHeart size={28} color="white" />
      Add to Favorites (Coming Soon)
    </button>
  );
};

export default FavoriteButton;
