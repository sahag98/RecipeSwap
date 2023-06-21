import RecipeItems from '@/components/RecipeItems'
import { getRecipes } from '@/utils'
import React from 'react'

type RecipeProps = {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

const Recipes = async () => {
  const recipes = await getRecipes()
  console.log(recipes)

  return (
    <main className='mx-auto'>
      <h1>Recipes:</h1>
      <div className='flex flex-wrap gap-7 justify-center'>
        {recipes.results?.map((recipe: RecipeProps) => (
          <RecipeItems recipe={recipe} />
        ))}</div>
    </main>
  )
}

export default Recipes