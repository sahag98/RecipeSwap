
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
  const { title, id, image } = recipe
  return (
      <div className='bg-[#dce8ef] shadow-lg shadow-accent/25 flex flex-col justify-between lg:w-80 p-3 gap-5 rounded-md'>
        <h2 className='font-semibold'>{title}</h2>
        <Image className='object-contain rounded-sm' src={image} alt='food-image' width={500} height={300} />
        <Link href={`/recipes/${id}`}>
        <button className='bg-accent text-white rounded-md w-full p-2 hover:bg-[#5ba1ca]'>View Recipe</button>
        </Link>
      </div>
  )
}

export default RecipeItems