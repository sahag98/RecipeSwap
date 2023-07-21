import React from "react";
import Image from "next/image";
import { getRecipeInfo } from "@/utils";
import Link from "next/link";

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

const RecipeItems = ({ recipe }: { recipe: RecipeProps }) => {
  const { id, name, image, cuisine, diet } = recipe;

  return (
    <div className="bg-[#dce8ef]  flex flex-col overflow-hidden justify-between lg:w-80 h-[400px] p-3 gap-2 rounded-md">
      <div className="h-80 object-fill rounded-md overflow-hidden">
        <Image
          className="object-cover h-80 rounded-md transition hover:scale-105"
          src={image ? image : ""}
          alt="food-image"
          width={500}
          height={500}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-secondary/75 w-fit mt-1 px-2 py-1 rounded-lg">
          <p className="text-xs text-white">{cuisine}</p>
        </div>
        <div className="bg-accent/75 w-fit mt-1 px-2 py-1 rounded-lg">
          <p className="text-xs text-white">{diet}</p>
        </div>
      </div>

      <h2 className="font-semibold text-md capitalize">{name}</h2>

      <Link href={`/recipes/${id}`}>
        <button className="bg-accent text-white rounded-md w-full p-3 hover:bg-[#5ba1ca]">
          View Recipe
        </button>
      </Link>
    </div>
  );
};

export default RecipeItems;
