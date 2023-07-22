import Image from "next/image";
import React from "react";

import ScrollTop from "@/components/ScrollTop";
import FavoriteButton from "@/components/FavoriteButton";
import { createServerClient } from "@/utils/supabase-server";
import { redirect } from "next/navigation";
export type searchParamProps = {
  id: any;
};

const page = async ({ params }: { params: searchParamProps }) => {
  console.log(params.id);
  const supabase = createServerClient();

  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", params.id);

  if (error) {
    console.log(error);
    throw new Error("Recipe not found.");
  }

  if (recipe?.length == 0) {
    redirect("/recipes");
  }

  return (
    <div className="lg:flex gap-10 mt-10">
      <ScrollTop />
      <section className="flex flex-col flex-2 gap-2">
        <div className="h-80 object-fill rounded-md overflow-hidden">
          <Image
            loading="lazy"
            className="object-contain rounded-md"
            src={recipe[0]?.image}
            alt={`picture`}
            width={450}
            height={450}
          />
        </div>
        <div>
          <h1 className="font-bold text-secondary">Recipe Name:</h1>
          <h2 className="font-medium">{recipe[0]?.name}</h2>
        </div>
        <div>
          <h1 className="font-bold text-secondary">Ready In:</h1>
          <p className="font-medium">{recipe[0]?.readyInMinutes} mins</p>
        </div>
        <div>
          <h1 className="font-bold text-secondary">Servings:</h1>
          <p className="font-medium">{recipe[0]?.servings}</p>
        </div>
        {/* <FavoriteButton recipesInfo={''} /> */}
      </section>
      <section className="flex-1 flex flex-col gap-3">
        <div>
          <h1 className="font-bold">Instructions:</h1>
          <p className="leading-7 text-justify">{recipe[0]?.instructions}</p>
        </div>
        <div>
          <h1 className="font-bold">Summary:</h1>
          <p className="leading-7 text-justify">{recipe[0]?.summary}</p>
        </div>
      </section>
    </div>
  );
};

export default page;
