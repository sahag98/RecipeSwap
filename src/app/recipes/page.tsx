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

  return (
    <main className='mx-auto'>
      <h1 className='text-center font-bold text-xl mb-5'>Recipes:</h1>
      <div className='flex flex-wrap gap-7 justify-center'>
        {recipes.results?.map((recipe: RecipeProps) => (
          <RecipeItems recipe={recipe} />
        ))}</div>
    </main>
  )
}

export default Recipes