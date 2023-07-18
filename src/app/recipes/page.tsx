import RecipeItems from "@/components/RecipeItems";
import { getRecipes } from "@/utils";
import React from "react";
import MyModal from "@/components/Filters";
type RecipeProps = {
  id: number;
  title: string;
  image: string;
  imageType: string;
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
  const recipes = await getRecipes({
    cuisines: searchParams.cuisines || "",
    diets: searchParams.diets || "",
  });

  return (
    <main className="mx-auto relative">
      <div className="flex relative justify-between items-center my-3">
        <h1 className="font-semibold text-lg text-secondary">
          List of Recipes
        </h1>
        <MyModal />
      </div>
      <div className="flex flex-wrap lg:gap-7 gap-10 justify-center lg:justify-between">
        {recipes.results?.map((recipe: RecipeProps, idx: number) => (
          <RecipeItems key={idx} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default Recipes;
