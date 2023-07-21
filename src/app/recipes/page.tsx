import RecipeItems from "@/components/RecipeItems";
import { getRecipes } from "@/utils";
import React from "react";
import MyModal from "@/components/Filters";
import { createServerClient } from "@/utils/supabase-server";

type RecipeProps = {
  id: number;
  title: string;
};

type FilterProps = {
  cuisines: string;
};

type HomeProps = {
  searchParams: FilterProps;
  cuisines: string;
  diets: string;
};

const Recipes = async ({ searchParams }: { searchParams: HomeProps }) => {
  const supabase = createServerClient();
  const { data: recipes } = await supabase.from("recipes").select();
  console.log(recipes);
  return (
    <main className="mx-auto relative">
      <div className="flex relative justify-between items-center mt-3 mb-5">
        <h1 className="font-semibold text-lg text-secondary">
          List of Recipes
        </h1>
        <MyModal />
      </div>
      <div className="flex flex-wrap lg:gap-7 gap-10 justify-center lg:justify-normal">
        {recipes?.map((recipe) => (
          <RecipeItems recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default Recipes;
