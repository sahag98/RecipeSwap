"use client";
import React from "react";
import { useSupabase } from "./supabase-provider";
import Image from "next/image";

type createdRecipeProps = {
  created_at: string | null;
  id: number;
  image: string | null;
  instructions: string | null;
  name: string | null;
  readyInMinutes: number | null;
  servings: number | null;
  summary: string | null;
  user_id: string | null;
};

const ProfileRecipes = ({
  createdRecipes,
}: {
  createdRecipes: createdRecipeProps;
}) => {
  return (
    <div className="bg-secondary w-full rounded-xl py-4 px-2">
      {createdRecipes.image && (
        <Image
          alt={createdRecipes.name + "image"}
          src={createdRecipes.image}
          width={30}
          height={30}
        />
      )}

      <h2 className="text-white font-medium">{createdRecipes.name}</h2>
      <ul className="text-white font-light">
        <li>Ready in {createdRecipes.readyInMinutes} minutes</li>
        <li>{createdRecipes.servings} servings</li>
      </ul>
    </div>
  );
};

export default ProfileRecipes;
