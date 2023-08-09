import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export type favoriteProps = {
  created_at: string | null;
  favoriteImg: string | null;
  favoriteName: string | null;
  id: number;
  recipe_id: number | null;
  user_id: string | null;
};

const FavoriteRecipes = ({ favorite }: { favorite: favoriteProps }) => {
  return (
    <div className="bg-primary border border-gray-200 dark:border-primary-foreground relative shadow-md shadow-[#ebebeb] dark:shadow-none dark:bg-primary-foreground flex flex-col mb-5 gap-2 lg:w-1/4 overflow-hidden rounded-xl">
      {favorite?.favoriteImg && (
        <Image
          className="w-full border-r object-cover h-full"
          alt={favorite?.favoriteName + "image"}
          src={favorite.favoriteImg}
          width={250}
          height={250}
        />
      )}
      <section className="flex flex-col gap-3 w-full px-3 justify-between">
        <h2 className="text-secondary capitalize font-medium">
          {favorite.favoriteName}
        </h2>
        <div className="mb-2 flex items-center justify-end gap-1">
          <Link href={`/recipes/${favorite.recipe_id}`}>
            <Button>View Recipe</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FavoriteRecipes;
