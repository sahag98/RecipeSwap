"use client";
import React from "react";
import { useSupabase } from "./supabase-provider";
import Image from "next/image";
import { BiTimer } from "react-icons/bi";
import { PiCookingPotLight } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";

type createdRecipeProps = {
  created_at: string | null;
  id: number;
  image: string;
  instructions: string;
  name: string;
  readyInMinutes: number | null;
  servings: number | null;
  summary: string | null;
  user_id: string;
};

const ProfileRecipes = ({
  createdRecipes,
}: {
  createdRecipes: createdRecipeProps;
}) => {
  return (
    <div className="bg-primary relative shadow-lg shadow-[#ebebeb]  border flex h-32 gap-2 w-full overflow-hidden rounded-xl">
      {createdRecipes.image && (
        <Image
          className="w-1/3 lg:w-1/4 border-r object-cover h-full"
          alt={createdRecipes.name + "image"}
          src={createdRecipes.image}
          width={250}
          height={250}
        />
      )}
      <section className="flex flex-col w-2/3 justify-between">
        <h2 className="text-secondary w-2/3 text-sm lg:text-base capitalize mt-2 font-medium">
          {createdRecipes.name}
        </h2>
        <div className="mb-2 flex items-center gap-1">
          <BiTimer className="w-7 h-7 text-accent" />
          <span className="text-xs font-medium">
            {createdRecipes.readyInMinutes
              ? createdRecipes.readyInMinutes + " mins"
              : "N/A"}
          </span>
          <section className="flex items-center ml-3 gap-1">
            <PiCookingPotLight className="w-7 h-7 text-secondary" />
            <span className="text-xs font-medium">
              {createdRecipes.servings
                ? createdRecipes.servings + " serving"
                : "N/A"}
            </span>
          </section>
        </div>
      </section>
      <div className="absolute flex gap-2 top-2 right-2">
        <EditRecipe
          id={createdRecipes.id}
          name={createdRecipes.name}
          mins={createdRecipes.readyInMinutes}
          summary={createdRecipes.summary}
          instructions={createdRecipes.instructions}
          servings={createdRecipes.servings}
          image={createdRecipes.image}
          userId={createdRecipes.user_id}
        />

        <DeleteRecipe id={createdRecipes.id} />
      </div>
    </div>
  );
};

export default ProfileRecipes;
