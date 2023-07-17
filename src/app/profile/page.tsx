import React from "react";
import { createServerClient } from "@/utils/supabase-server";
import ProfileRecipes from "@/components/ProfileRecipes";

const Profile = async () => {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session?.user.id);
  const { data: recipes } = await supabase
    .from("recipes")
    .select()
    .eq("user_id", session?.user.id);

  console.log("server ", recipes);
  return (
    <div>
      <h1>Created Recipes:</h1>
      {recipes?.map((recipe) => (
        <ProfileRecipes key={recipe.id} createdRecipes={recipe} />
      ))}
    </div>
  );
};

export default Profile;
