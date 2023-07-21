import React from "react";
import { createServerClient } from "@/utils/supabase-server";
import ProfileRecipes from "@/components/ProfileRecipes";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";

const Profile = async () => {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  console.log(session?.user.id);
  const { data: recipes } = await supabase
    .from("recipes")
    .select()
    .eq("user_id", session?.user.id);

  return (
    <div className="flex flex-col justify-center gap-5 items-center">
      <div className="relative">
        <Image
          alt="profile photo"
          src="/user-profile.svg"
          width={100}
          height={100}
          className="rounded-full p-1 bg-accent/25"
        />
        <div className="bg-accent flex justify-center items-center rounded-full absolute bottom-0 right-0 w-8 h-8">
          <AiOutlinePlus className="text-white w-5 h-5" />
        </div>
      </div>
      <h1 className="font-bold text-lg">{session?.user.user_metadata.name}</h1>
      <h2 className="font-medium text-secondary">Recipes created</h2>
      {recipes?.map((recipe) => (
        <ProfileRecipes key={recipe.id} createdRecipes={recipe} />
      ))}
    </div>
  );
};

export default Profile;
