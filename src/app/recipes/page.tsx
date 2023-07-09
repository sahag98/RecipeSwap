
import RecipeItems from '@/components/RecipeItems'
import { getRecipes } from '@/utils'
import React from 'react'
import MyModal from '@/components/Filters';
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
    <main className='mx-auto relative'>
      <div className='flex relative justify-between items-center my-3'>
        <h1 className='font-semibold text-xl text-secondary'>List of Recipes</h1>
        {/* <div className='flex items-center bg-accent bg-opacity-0 p-2 rounded-md hover:bg-opacity-20 gap-2 cursor-pointer'>
          <span className='text-accent'>Filters</span>
        <FiFilter className='w-6 h-6 text-accent' />
        </div> */}
        <MyModal />
      {/* <div className='flex absolute lg:hidden gap-5 right-0'>
      <CustomFilter title="cuisines" options={cuisines} />
      <CustomFilter title="diets"  options={diets} />
      </div>
      <div className='hidden lg:flex absolute gap-5  right-0'>
      <CustomFilter title="cuisines" options={cuisines} />
      <CustomFilter title="diets"  options={diets} />
      </div> */}
      </div>
      <div className='flex flex-wrap gap-7 justify-center lg:justify-between'>
        {recipes.results?.map((recipe: RecipeProps, idx: number) => (
          <RecipeItems key={idx} recipe={recipe} />
        ))}
      </div>
    </main>
  )
}

export default Recipes