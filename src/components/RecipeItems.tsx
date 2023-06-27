"use client"
import React from 'react'
import Image from 'next/image'
import { getRecipeInfo } from '@/utils';
import Link from 'next/link';
type RecipeProps = {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

const RecipeItems = ({ recipe }: { recipe: RecipeProps }) => {

  const { title, id, image, imageType } = recipe
  return (
      <div className='bg-slate-100 flex flex-col justify-between w-80 p-3 gap-5 rounded-md'>
        <h2 className='font-semibold'>{title}</h2>
        <Image className='object-contain' src={image} alt='food-image' width={500} height={300} />
        <Link href={`/recipes/${id}`}>
        <button className='bg-accent text-white rounded-md w-full p-2 hover:bg-[#5ba1ca]'>View Recipe</button>
        </Link>
      </div>
  )
}

export default RecipeItems