import CustomFilter from '@/components/CustomFilter';
import RecipeItems from '@/components/RecipeItems'
import { getRecipes } from '@/utils'
import React from 'react'
import { Suspense } from 'react'
import { cuisines, diets } from '@/constants'
import ClearFilter from '@/components/ClearFilter';
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
  cuisines: string,
  diets: string,
}

const Recipes = async ({searchParams} : {searchParams : HomeProps}) => {
  const recipes = await getRecipes(
    {
      cuisines: searchParams.cuisines || '',
      diets: searchParams.diets || ''
  })

  return (
    <main className='mx-auto relative p-3'>
      <div className='flex justify-between mb-10'>
      <h1 className='text-center font-bold text-xl mt-2'>Recipes:</h1>
      <div className='flex absolute lg:hidden gap-5 mt-8 top-3 right-4'>
      <CustomFilter title="cuisines" options={cuisines} />
      <CustomFilter title="diets"  options={diets} />
      </div>
      <div className='hidden lg:flex absolute gap-5 top-3 right-3'>
      <CustomFilter title="cuisines" options={cuisines} />
      <CustomFilter title="diets"  options={diets} />
      </div>
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