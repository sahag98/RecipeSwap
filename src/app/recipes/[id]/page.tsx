import Image from "next/image";
import React from "react";

import ScrollTop from "@/components/ScrollTop";
import FavoriteButton from "@/components/FavoriteButton";
import { createServerClient } from "@/utils/supabase-server";
import { redirect } from "next/navigation";
import { format } from "timeago.js";
import { Metadata, ResolvingMetadata } from "next";
import Review from "@/components/Review";
import { AiFillHeart } from "react-icons/ai";
import Likes from "@/components/Likes";
import parse from "html-react-parser";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import Save from "@/components/Save";
import NearMe from "@/components/near-me";

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

  const { data: reviews, error: reviewError } = await supabase
    .from("reviews")
    .select("*, profiles(*)")
    .eq("recipe_id", recipe[0].id)
    .order("id", { ascending: false });

  if (!reviews) {
    console.log("No reviews yet");
  }

  // const { data: favorites } = await supabase
  //   .from("profiles")
  //   .select("favorites")
  //   .eq("id", session?.user.id);

  const { data: likes, error: likesError } = await supabase
    .from("likes")
    .select()
    .eq("recipe_id", recipe[0].id);

  const { data: saves, error: savesError } = await supabase
    .from("favorites")
    .select()
    .eq("recipe_id", recipe[0].id);

  const isLikedByMe = !!likes?.find((like) => like.user_id == session?.user.id);

  const isSavedByMe = !!saves?.find((save) => save.user_id == session?.user.id);
  return (
    <div className="mb-2">
      <ScrollTop />
      <section className="flex flex-col flex-2 gap-2 mb-2">
        <div className="max-h-[450px] w-full shadow-md flex justify-center items-center object-fill md:bg-accent-hover lg:bg-accent-hover dark:lg:bg-primary-foreground dark:md:bg-primary-foreground rounded-lg overflow-hidden">
          <Image
            loading="lazy"
            className="lg:w-2/3 lg:h-[450px] h-80 object-cover lg:object-contain"
            src={recipe[0]?.image}
            alt={`picture`}
            width={450}
            height={450}
          />
        </div>
        <section className="flex flex-col gap-1">
          <section className="flex justify-between items-center">
            <div>
              <h1 className="lg:text-xl dark:text-foreground break-words mt-1 capitalize text-lg font-bold  max-w-1/2 tracking-wide">
                {recipe[0]?.name}
              </h1>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Likes
                    recipeId={recipe[0].id}
                    likes={likes}
                    isLikedByMe={isLikedByMe}
                    userId={session ? session?.user.id : null}
                  />

                  <Save
                    recipeId={recipe[0].id}
                    recipeName={recipe[0].name}
                    recipeImg={recipe[0].image}
                    saves={saves}
                    isSavedByMe={isSavedByMe}
                    userId={session ? session?.user.id : null}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold dark:text-foreground text-sm lg:text-base">
                  {profiles[0].full_name}
                </h2>
                <Image
                  className="rounded-full dark:border-none border-gray-200 border w-8 h-8 object-cover"
                  src={profiles[0].avatar_url!}
                  alt={profiles[0].avatar_url!}
                  width={40}
                  height={40}
                />
              </div>
              <h2 className="text-xs lg:text-sm text-gray-500">
                {format(recipe[0].created_at!)}
              </h2>
            </div>
          </section>
          <div className="flex flex-col gap-1">
            <NearMe recipe={recipe[0].name} />
            <div className="flex items-center gap-1">
              <h1 className="font-bold text-sm lg:text-base text-secondary">
                Ready In:
              </h1>
              <p className="font-medium dark:text-foreground text-sm lg:text-base">
                {recipe[0]?.readyInMinutes
                  ? recipe[0]?.readyInMinutes + " mins"
                  : "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <h1 className="font-bold text-sm lg:text-base text-secondary">
                Servings:
              </h1>
              <p className="font-medium dark:text-foreground text-sm lg:text-base">
                {recipe[0]?.servings ? recipe[0]?.servings : "N/A"}
              </p>
            </div>
          </div>
        </section>
      </section>
      <section className="flex-1 flex flex-col gap-3">
        {recipe[0].summary && (
          <div>
            <h2 className="font-bold text-gray-700 dark:text-foreground text-lg">
              Summary
            </h2>
            <p className="leading-7 dark:text-foreground/80">
              {recipe[0]?.summary}
            </p>
          </div>
        )}
        {recipe[0].ingredients && (
          <div>
            <h2 className="font-bold text-gray-700 dark:text-foreground text-lg">
              Ingredients
            </h2>
            <p className="leading-7 dark:text-foreground/80">
              {parse(recipe[0]?.ingredients)}
            </p>
          </div>
        )}
        <div>
          <h2 className="font-bold text-gray-700 dark:text-foreground text-lg">
            Instructions
          </h2>
          <p className="leading-7 dark:text-foreground/80">
            {parse(recipe[0]?.instructions)}
          </p>
        </div>

        <div>
          <section className="flex items-center mb-1 gap-1">
            <h2 className="font-bold text-gray-700 text-lg dark:text-foreground">
              Reviews
            </h2>
            <span className="text-sm mt-[1px]">({reviews?.length})</span>
          </section>

          <Review RecipeId={recipe[0].id} />
          {reviews?.length === 0 && (
            <h2 className="mt-4 text-sm font-medium">No Reviews yet!</h2>
          )}
          <div className="mt-4">
            {reviews?.map((review) => (
              <div
                className="mt-3 bg-accent-hover dark:bg-primary-foreground p-2 rounded-md"
                key={review.id}
              >
                <div className="flex items-center justify-between mb-2">
                  <section className="flex items-center gap-2">
                    <Image
                      alt="review profile image"
                      className=" w-9 h-9 object-cover rounded-full"
                      src={
                        review.profiles?.avatar_url
                          ? review.profiles?.avatar_url
                          : ""
                      }
                      width={40}
                      height={40}
                    />
                    <h2 className="text-sm font-medium">
                      {review.profiles?.full_name}
                    </h2>
                  </section>
                  <span className="text-xs text-gray-600">
                    {format(review.created_at!)}
                  </span>
                </div>

                <span className="ml-2 text-sm">{review.review}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
