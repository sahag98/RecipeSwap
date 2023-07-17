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
    <div className="border-secondary border rounded-sm py-4 px-2">
      {createdRecipes.image && (
        <Image
          alt={createdRecipes.name + "image"}
          src={createdRecipes.image}
          width={30}
          height={30}
        />
      )}

      <h2 className="font-medium">{createdRecipes.name}</h2>
      <span></span>
    </div>
  );
};

export default ProfileRecipes;
