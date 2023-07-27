import Image from "next/image";
import React from "react";

import ScrollTop from "@/components/ScrollTop";
import FavoriteButton from "@/components/FavoriteButton";
import { createServerClient } from "@/utils/supabase-server";
import { redirect } from "next/navigation";
import { format } from "timeago.js";
import { Metadata, ResolvingMetadata } from "next";
export type searchParamProps = {
  id: any;
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const supabase = createServerClient();

  const id = params.id;

  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id);

  if (!recipe) {
    throw new Error("No recipe found");
  }

  return {
    title: recipe[0].name + " recipe",
  };
}

const page = async ({ params }: { params: searchParamProps }) => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

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

  const { data: favorites } = await supabase
    .from("profiles")
    .select("favorites")
    .eq("id", session?.user.id);

  return (
    <div>
      <ScrollTop />
      <section className="flex flex-col flex-2 gap-2 mb-2">
        <div className="max-h-96 w-full shadow-md flex justify-center items-center object-fill lg:bg-secondary rounded-lg overflow-hidden">
          <Image
            loading="lazy"
            className="lg:w-1/2 h-80 object-cover"
            src={recipe[0]?.image}
            alt={`picture`}
            width={450}
            height={450}
          />
        </div>
        <div className="flex justify-between">
          <h1 className="lg:text-xl break-words mt-1 capitalize text-lg font-bold w-1/2 tracking-wide">
            {recipe[0]?.name}
          </h1>

          <div className="flex flex-col gap-1 ">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-sm lg:text-base">
                {profiles[0].full_name}
              </h2>
              <Image
                className="rounded-full w-8 h-8 object-cover"
                src={profiles[0].avatar_url!}
                alt={profiles[0].avatar_url!}
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-sm lg:text-base">
              {format(recipe[0].created_at!)}
            </h2>
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
        {session && (
          <FavoriteButton favorites={favorites} recipesInfo={recipe[0]} />
        )}
      </section>
      <section className="flex-1 flex flex-col gap-3">
        <div>
          <h1 className="font-bold">Instructions:</h1>
          <p className="leading-7 text-justify">{recipe[0]?.instructions}</p>
        </div>
        <div>
          <h1 className="font-bold ">Summary:</h1>
          <p className="leading-7 text-justify">{recipe[0]?.summary}</p>
        </div>
      </section>
    </div>
  );
};

export default page;
