import CustomFilter from '@/components/CustomFilter';
import RecipeItems from '@/components/RecipeItems'
import { getRecipes } from '@/utils'
import React from 'react'
import { Suspense } from 'react'

type RecipeProps = {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

type FilterProps = {
  cuisines: string;
}

type HomeProps ={
  searchParams: FilterProps
  cuisines: string
}

const Recipes = async ({searchParams} : {searchParams : HomeProps}) => {
  console.log('server search params:',searchParams.cuisines)
  const recipes = await getRecipes({cuisines: searchParams.cuisines || ''})

  return (
    <main className='mx-auto relative p-3'>
      <div className='flex justify-between mb-10'>
      <h1 className='text-center font-bold text-xl mt-2'>Recipes:</h1>
      <CustomFilter />
      </div>
      <div className='flex flex-wrap gap-7 justify-center'>
        {recipes.results?.map((recipe: RecipeProps) => (
          <RecipeItems recipe={recipe} />
        ))}
      </div>
    </main>
  )
}

export default Recipes