import RecipeItems from "@/components/RecipeItems";
import React from "react";
import MyModal from "@/components/Filters";
import { createServerClient } from "@/utils/supabase-server";
import Subscription from "@/components/Subscription";

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

  return (
    <main className="mx-auto relative">
      <div className="flex relative justify-between items-center mt-3 mb-5">
        <h1 className="font-semibold text-lg text-secondary">
          List of Recipes
        </h1>
        <Subscription />
        <MyModal />
      </div>
      <div className="flex flex-wrap lg:gap-7 gap-10 justify-center lg:justify-normal">
        {recipes?.map((recipe) => (
          <RecipeItems key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default Recipes;
