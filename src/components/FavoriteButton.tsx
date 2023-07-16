"use client";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useSupabase } from "./supabase-provider";

const FavoriteButton = () => {
  const { supabase, session } = useSupabase();
  return (
    <div className="w-full bg-accent mb-2 flex rounded-md cursor-pointer hover:bg-[#5ba1ca] items-center justify-center gap-2">
      <AiOutlineHeart size={28} color="white" />
      <button
        onClick={() => console.log("clicked")}
        disabled={!session ? true : false}
        className=" text-white py-2"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default FavoriteButton;
