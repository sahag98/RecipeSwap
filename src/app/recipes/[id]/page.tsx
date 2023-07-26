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

  let { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", recipe[0].user_id);

  if (!profiles) {
    throw new Error("Something went wrong.");
  }

  return (
    <div>
      <ScrollTop />
      <section className="flex flex-col flex-2 gap-2 mb-2">
        <div className="max-h-96 w-full flex justify-center items-center object-fill bg-secondary rounded-lg overflow-hidden">
          <Image
            loading="lazy"
            className="lg:w-1/2 h-80 object-cover"
            src={recipe[0]?.image}
            alt={`picture`}
            width={450}
            height={450}
          />
        </div>
        <div className="flex items-center justify-between">
          <h1 className="lg:text-xl break-words capitalize text-lg font-bold w-2/3 tracking-wide">
            {recipe[0]?.name}
          </h1>

          <div className="flex items-center gap-2">
            <h2 className="font-medium text-sm lg:text-base">
              {profiles[0].full_name}
            </h2>
            <Image
              className="rounded-full w-9 h-9 object-cover"
              src={profiles[0].avatar_url!}
              alt={profiles[0].avatar_url!}
              width={45}
              height={45}
            />
          </div>
        </div>
        <h2 className="font-semibold lg:text-lg">Recipe Information:</h2>
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-secondary">Ready In:</h1>
          <p className="font-medium">{recipe[0]?.readyInMinutes} mins</p>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-secondary">Servings:</h1>
          <p className="font-medium">{recipe[0]?.servings}</p>
        </div>
        {/* <FavoriteButton /> */}
      </section>
      <section className="flex-1 flex flex-col gap-3">
        <div>
          <h1 className="font-bold lg:text-start text-center">Instructions:</h1>
          <p className="leading-7 text-justify">{recipe[0]?.instructions}</p>
        </div>
        <div>
          <h1 className="font-bold lg:text-start text-center">Summary:</h1>
          <p className="leading-7 text-justify">{recipe[0]?.summary}</p>
        </div>
      </section>
    </div>
  );
};

export default page;
