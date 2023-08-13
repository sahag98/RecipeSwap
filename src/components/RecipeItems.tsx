import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createServerClient } from "@/utils/supabase-server";
import { Button } from "./ui/button";

type RecipeProps = {
  created_at: string | null;
  id: number;
  image: string;
  instructions: string | null;
  name: string | null;
  readyInMinutes: number | null;
  servings: number | null;
  summary: string | null;
  user_id: string | null;
  cuisine: string | null;
  diet: string | null;
};

const RecipeItems = async ({ recipe }: { recipe: RecipeProps }) => {
  const { id, name, image, cuisine, diet } = recipe;

  return (
    <div className="bg-[#dce8ef] dark:bg-primary-foreground  flex flex-col overflow-hidden justify-between lg:w-80 h-[400px] p-2 gap-2 rounded-md">
      <div className="h-80 object-fill rounded-md overflow-hidden">
        <Image
          className="object-cover h-80 rounded-md transition"
          src={image ? image : ""}
          alt="food-image"
          width={500}
          height={500}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-secondary w-fit mt-1 px-2 py-1 rounded-lg">
          <p className="text-xs text-white dark:text-foreground">{cuisine}</p>
        </div>
        <div className="bg-accent w-fit mt-1 px-2 py-1 rounded-lg">
          <p className="text-xs dark:text-foreground text-white">{diet}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className="font-semibold text-md capitalize">{name}</h2>
      </div>
      <Link href={`/recipes/${id}`}>
        <Button
          data-cy="viewRecipe"
          className="w-full dark:bg-background dark:border-none dark:hover:bg-accent dark:hover:text-primary"
        >
          View Recipe
        </Button>
      </Link>
    </div>
  );
};

export default RecipeItems;
