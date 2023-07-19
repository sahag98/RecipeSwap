import React from "react";
import Image from "next/image";
import { getRecipeInfo } from "@/utils";
import Link from "next/link";

type RecipeProps = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

const RecipeItems = ({ recipe }: { recipe: RecipeProps }) => {
  const { title, id, image } = recipe;
  console.log(recipe);
  return (
    <div className="bg-[#dce8ef]  flex flex-col justify-between lg:w-80 p-3 gap-5 rounded-md">
      <Image
        className="object-contain rounded-md"
        src={image}
        alt="food-image"
        width={500}
        height={300}
      />
      <h2 className="font-semibold text-md">{title}</h2>
      <Link href={`/recipes/${id}`}>
        <button className="bg-accent text-white rounded-md w-full p-3 hover:bg-[#5ba1ca]">
          View Recipe
        </button>
      </Link>
    </div>
  );
};

export default RecipeItems;
