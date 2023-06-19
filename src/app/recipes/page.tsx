import RecipeItems from '@/components/RecipeItems'
import { getRecipes } from '@/utils'
import React from 'react'
type RecipeProps = {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

const Recipes = async () => {
  const recipes = await getRecipes()

  console.log(recipes)
  return (
    <div>{recipes?.map((recipe: RecipeProps) => (
      <RecipeItems recipe={recipe} />
    ))}</div>
  )
}

export default Recipes