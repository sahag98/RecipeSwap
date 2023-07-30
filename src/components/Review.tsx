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
    // let new_element = comment;

    try {
      const { data, error } = await supabase.rpc("add_review", {
        recipe_id: RecipeId,
        review: {
          rating: 5,
          comment: comment,
          userId: session?.user.id,
        },
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
      <h2 className="font-bold text-gray-700 mb-1">Reviews</h2>
      <form
        onSubmit={addReview}
        className="flex items-center justify-between gap-3"
      >
        <input
          className="bg-gray-200 outline-none text-sm rounded-md w-full p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Write a review..."
        />
        <button className="bg-accent hover:bg-accent/90 transition rounded-full p-3 text-white">
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
};

export default Review;
