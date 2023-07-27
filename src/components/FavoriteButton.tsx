"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";

export type recipesInfoProps = {
  title: string;
  readInMinutes: number;
  servings: number;
  image: string;
  summary: string;
  instructions: string;
};

const FavoriteButton = ({ recipesInfo, favorites }: any) => {
  const { supabase, session } = useSupabase();
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);
  const [currentFavorites, setCurrentFavorites] = useState<any>(
    favorites[0].favorites
  );
  const router = useRouter();

  console.log("current :", currentFavorites);

  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     let { data: favorites, error } = await supabase
  //       .from("profiles")
  //       .select("favorites")
  //       .eq("id", session?.user.id);
  //     if (!favorites) {
  //       return;
  //     }
  //     favorites[0].favorites!.map((f: any) => {
  //       if (f === recipesInfo.name) {
  //         setAlreadyFavorited(true);
  //       }
  //     });
  //   };
  //   if (session?.user) {
  //     fetchFavorites();
  //   }
  // }, []);

  useEffect(() => {
    const profiles = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${session?.user.id}`,
        },
        (payload: any) => {
          const favorites = payload.new.favorites;
          favorites.map((f: any) => {
            if (f === recipesInfo.name) {
              setAlreadyFavorited(true);
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profiles);
    };
  }, []);

  async function addToFavorites(recipe: string) {
    let new_element = recipe;
    let id = session?.user.id;

    try {
      setIsFavoriting(true);
      let { data, error } = await supabase.rpc("append_array", {
        id,
        new_element,
      });
      router.refresh();
    } catch (error) {
      throw error;
    } finally {
      setIsFavoriting(false);
    }
  }

  return (
    <>
      {session?.user ? (
        <button
          onClick={() => addToFavorites(recipesInfo.name)}
          disabled={isFavoriting}
          className={
            currentFavorites.includes(recipesInfo.name) || alreadyFavorited
              ? "flex items-center font-semibold cursor-auto justify-center rounded text-white  bg-accent/75 w-full py-2"
              : "flex items-center font-semibold gap-1 justify-center rounded hover:bg-accent/90 transition text-white bg-accent w-full py-2"
          }
        >
          <AiOutlineHeart size={28} color="white" />
          {currentFavorites.includes(recipesInfo.name) || alreadyFavorited
            ? "Already favorited"
            : "Favorite"}
        </button>
      ) : (
        <button
          disabled={true}
          className="flex items-center justify-center rounded hover:bg-accent/90 transition text-white bg-accent w-full py-2"
        >
          <AiOutlineHeart size={28} color="white" />
          Sign in to Favorite
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
