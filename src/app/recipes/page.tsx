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

type RecipeProps = {
  created_at: string | null;
  cuisine: string;
  diet: string;
  id: number;
  image: string;
  instructions: string;
  name: string;
  readyInMinutes: number;
  servings: number | null;
  summary: string;
  user_id: string;
};

const Recipes = async ({ searchParams }: { searchParams: HomeProps }) => {
  const supabase = createServerClient();
  let recipeData: any = [];

  if (JSON.stringify(searchParams) === "{}") {
    const { data: recipes } = await supabase.from("recipes").select("*");
    recipeData = recipes;
  } else {
    const { data: recipes } = await supabase
      .from("recipes")
      .select("*")
      .eq("cuisine", searchParams.cuisines || "")
      .eq("diet", searchParams.diets || "");
    recipeData = recipes;
  }

  return (
    <main className="mx-auto my-5 relative">
      <div className="flex relative justify-between items-center mb-5">
        <h1 className="font-semibold text-lg text-secondary">
          List of Recipes
        </h1>
        <Subscription />
        <MyModal />
      </div>
      {recipeData.length === 0 && (
        <p className="text-center lg:text-xl text-lg mt-10 font-semibold">
          <span className="text-secondary">No recipes found,</span> try a
          different filter.
        </p>
      )}
      <div className="flex flex-wrap lg:gap-7 gap-10 justify-center lg:justify-normal">
        {recipeData?.map((recipe: RecipeProps) => (
          <RecipeItems key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default Recipes;
