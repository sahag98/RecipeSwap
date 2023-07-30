"use client";
import React from "react";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";

type likeProps = {
  recipeId: number;
  userId: string | null;
  isLikedByMe: boolean;
  likes:
    | {
        created_at: string | null;
        id: number;
        recipe_id: number | null;
        user_id: string | null;
      }[]
    | null;
};

const Likes = ({ recipeId, userId, likes, isLikedByMe }: likeProps) => {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  async function toggleLike() {
    if (!session) {
      alert("You need to sign in to like a recipe");
      return;
    }

    if (isLikedByMe) {
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", userId);
    } else {
      const { data, error } = await supabase.from("likes").insert({
        recipe_id: recipeId,
        user_id: userId,
      });

      if (error) {
        console.log(error);
      }
    }
    router.refresh();
  }

  return (
    <button className="flex items-center gap-1" onClick={toggleLike}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={
          "w-6 h-6 lg:hover:fill-red-400 md:hover:fill-red-400 transition " +
          (isLikedByMe ? "fill-red-500" : "")
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {likes?.length}
    </button>
  );
};

export default Likes;
