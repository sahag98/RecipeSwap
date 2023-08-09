import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileRecipes from "./ProfileRecipes";
import FavoriteRecipes from "./FavoriteRecipes";

export type favoriteProps = {
  created_at: string | null;
  favoriteImg: string | null;
  favoriteName: string | null;
  id: number;
  recipe_id: number | null;
  user_id: string | null;
}[];
null;

type recipesProps =
  | {
      created_at: string | null;
      cuisine: string;
      diet: string;
      id: number;
      image: string;
      instructions: string;
      name: string;
      readyInMinutes: number | null;
      servings: number | null;
      summary: string | null;
      user_id: string;
    }[]
  | null;

export function TabSwitch({
  recipes,
  favorites,
}: {
  recipes: recipesProps;
  favorites: favoriteProps;
}) {
  return (
    <Tabs
      defaultValue="recipes"
      className="w-full flex flex-col items-center justify-center"
    >
      <TabsList className="grid lg:w-[400px] grid-cols-2 mb-2">
        <TabsTrigger value="recipes">Recipes Created</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="recipes">
        {recipes?.map((recipe) => (
          <ProfileRecipes key={recipe.id} createdRecipes={recipe} />
        ))}
      </TabsContent>
      <TabsContent className="w-full lg:flex lg:gap-10" value="favorites">
        {favorites?.map((favorite) => (
          <FavoriteRecipes key={favorite.id} favorite={favorite} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
