"use client";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";

const Review = ({ RecipeId }: any) => {
  const { supabase, session } = useSupabase();
  const [comment, setComment] = useState("");
  const router = useRouter();

  async function addReview(e: any) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("reviews").insert({
        recipe_id: RecipeId,
        user_id: session?.user.id,
        review: comment,
      });

      setComment("");
      router.refresh();
    } catch (error) {
      throw error;
    } finally {
    }
  }

  return (
    <div>
      <form
        onSubmit={addReview}
        className="flex items-center justify-between gap-3"
      >
        <input
          className="bg-gray-200 outline-none text-sm rounded-md w-full px-2 py-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Write a review..."
        />
        <button className="bg-accent hover:bg-accent/90 transition rounded-full p-3 text-white">
          <AiOutlineSend className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Review;
