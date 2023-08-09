import React from "react";
import { createServerClient } from "@/utils/supabase-server";
import ProfileRecipes from "@/components/ProfileRecipes";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import Avatar from "@/components/Avatar";
import { TabSwitch } from "@/components/Tabs";

type createdRecipeProps = {
  created_at: string | null;
  id: number;
  image: string;
  instructions: string;
  name: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  user_id: string;
};

const Profile = async () => {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: avatar } = await supabase
    .from("profiles")
    .select("avatar_url, full_name")
    .eq("id", session?.user.id);

  console.log(avatar);
  const { data: favorites, error: favoritesError } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", session?.user.id);

  // console.log("user likes: ", userLikes[0].likes);

  if (!avatar) {
    return;
  }

  const { data: recipes } = await supabase
    .from("recipes")
    .select()
    .eq("user_id", session?.user.id);

  return (
    <div className="flex flex-col my-5 justify-center gap-5 items-center">
      <Avatar avatar={avatar} />

      {recipes?.length === 0 ? (
        <>
          <h2 className="font-medium text-secondary">
            No recipes created yet!
          </h2>
          <Image
            src="/undraw_refreshing_beverage_td3r.svg"
            alt="profile no recipe img"
            width={120}
            height={120}
          />
        </>
      ) : (
        <TabSwitch recipes={recipes} favorites={favorites!} />
      )}
    </div>
  );
};

export default Profile;
