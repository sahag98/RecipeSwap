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

  // let { data: ReviewProfile, error: ReviewError } = await supabase
  //   .from("reviews")
  //   .select("*, profiles(*)")
  //   .eq("id", recipe[0].user_id);

  const { data: reviews, error: reviewError } = await supabase
    .from("reviews")
    .select("*, profiles(*)")
    .eq("recipe_id", recipe[0].id);

  if (!reviews) {
    console.log("No reviews yet");
  }

  console.log(reviews);

  const { data: favorites } = await supabase
    .from("profiles")
    .select("favorites")
    .eq("id", session?.user.id);

  const { data: likes, error: likesError } = await supabase
    .from("likes")
    .select()
    .eq("recipe_id", recipe[0].id);

  const isLikedByMe = !!likes?.find((like) => like.user_id == session?.user.id);

  return (
    <div className="mb-2">
      <ScrollTop />
      <section className="flex flex-col flex-2 gap-2 mb-2">
        <div className="max-h-[450px] w-full shadow-md flex justify-center items-center object-fill md:bg-secondary lg:bg-secondary rounded-lg overflow-hidden">
          <Image
            loading="lazy"
            className="lg:w-1/2 lg:h-96 h-80 object-cover"
            src={recipe[0]?.image}
            alt={`picture`}
            width={450}
            height={450}
          />
        </div>
        <section className="flex flex-col gap-1">
          <section className="flex justify-between items-center">
            <div>
              <h1 className="lg:text-xl break-words mt-1 capitalize text-lg font-bold  max-w-1/2 tracking-wide">
                {recipe[0]?.name}
              </h1>
              <div className="flex items-center gap-2">
                <Likes
                  recipeId={recipe[0].id}
                  likes={likes}
                  isLikedByMe={isLikedByMe}
                  userId={session ? session?.user.id : null}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-sm lg:text-base">
                  {profiles[0].full_name}
                </h2>
                <Image
                  className="rounded-full border-gray-200 border w-8 h-8 object-cover"
                  src={profiles[0].avatar_url!}
                  alt={profiles[0].avatar_url!}
                  width={40}
                  height={40}
                />
              </div>
              <h2 className="text-sm text-gray-500">
                {format(recipe[0].created_at!)}
              </h2>
            </div>
          </section>
          {/* <h2 className="font-semibold lg:text-lg text-gray-700">
          Recipe Information
        </h2> */}

          <div className="flex items-center gap-1">
            <h1 className="font-bold text-sm lg:text-base text-secondary">
              Ready In:
            </h1>
            <p className="font-medium text-sm lg:text-base">
              {recipe[0]?.readyInMinutes
                ? recipe[0]?.readyInMinutes + " mins"
                : "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="font-bold text-sm lg:text-base text-secondary">
              Servings:
            </h1>
            <p className="font-medium text-sm lg:text-base">
              {recipe[0]?.servings ? recipe[0]?.servings : "N/A"}
            </p>
          </div>
          {/* {session && (
          <FavoriteButton favorites={favorites} recipesInfo={recipe[0]} />
        )} */}
        </section>
      </section>
      <section className="flex-1 flex flex-col gap-3">
        <div>
          <h2 className="font-bold text-gray-700 text-lg">Instructions</h2>
          <p className="leading-7">{parse(recipe[0]?.instructions)}</p>
        </div>
        {recipe[0].summary && (
          <div>
            <h2 className="font-bold text-gray-700">Summary</h2>
            <p className="leading-7">{recipe[0]?.summary}</p>
          </div>
        )}

        <div>
          <section className="flex items-center mb-1 gap-1">
            <h2 className="font-bold text-gray-700">Reviews</h2>
            <span className="text-sm mt-[1px]">({reviews?.length})</span>
          </section>

          <Review RecipeId={recipe[0].id} />
          {reviews?.length === 0 && (
            <h2 className="mt-4 text-sm font-medium">No Reviews yet!</h2>
          )}
          <div className="mt-4">
            {reviews?.map((review) => (
              <div className="mt-3 bg-accent/20 p-2 rounded-md" key={review.id}>
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
