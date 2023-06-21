"use client"
import React from 'react'
import Image from 'next/image'
import { getRecipeInfo } from '@/utils';
type RecipeProps = {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

const RecipeItems = ({ recipe }: { recipe: RecipeProps }) => {
  console.log(recipe)
  const { title, id, image, imageType } = recipe
  return (

    <div onClick={() => getRecipeInfo(id)} className='bg-slate-200 flex flex-col justify-between w-80 p-3 rounded-md'>
      <h2 className='font-semibold'>{title}</h2>
      <Image className='object-contain' src={image} alt='food-image' width={500} height={300} />
    </div>
  )
}

export default RecipeItems