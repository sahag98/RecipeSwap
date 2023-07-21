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

const FavoriteButton = ({ recipesInfo }: { recipesInfo: recipesInfoProps }) => {
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
    <div className="w-full bg-accent mb-2 flex rounded-md cursor-pointer hover:bg-[#5ba1ca] items-center justify-center gap-2">
      <AiOutlineHeart size={28} color="white" />
      <button
        onClick={() => addToFavorites(recipesInfo.title)}
        disabled={!session ? true : false}
        className=" text-white py-3"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default FavoriteButton;
