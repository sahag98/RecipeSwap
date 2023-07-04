
import { getRecipeInfo } from '@/utils'
import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser';
import {AiOutlineHeart} from 'react-icons/ai'

export type searchParamProps= {
  id: number,
}

const page = async ({params}: {params: searchParamProps}) => {
  const recipesInfo = await getRecipeInfo(params.id)

  const {title, readyInMinutes, servings, sourceUrl, image, summary,instructions} = recipesInfo
  return (
    <div className='lg:flex gap-10 mt-10'>
      <section className='flex flex-col flex-2 gap-2'>
      <Image className='object-contain rounded-md' src={image} alt={`${title} picture`} width={450} height={450}  />
      <div>
        <h1 className='font-bold text-secondary'>Recipe Name:</h1>
      <h2>{title}</h2>
        </div>
        <div>
      <h1 className='font-bold text-secondary'>Ready In:</h1>
      <p>{readyInMinutes} mins</p>
      </div>
      <div>
      <h1 className='font-bold text-secondary'>Servings:</h1>
      <p>{servings}</p>
      </div>
      <div className='w-full bg-accent flex rounded-md cursor-pointer hover:bg-[#5ba1ca] items-center justify-center gap-2'>
        <AiOutlineHeart size={28} color='white' />
      <button className=' text-white py-2'>Add to Favorites</button>
      </div>
      
      </section>
      <section className='flex-1 flex flex-col gap-3'>
       
     <div>
     <h1 className='font-bold'>Instructions:</h1>
      <p className='leading-7 text-justify'>{instructions}</p>
     </div>
     <div>
     <h1 className='font-bold'>Summary:</h1>
      <p className='leading-7 text-justify'>{parse(summary)}</p>
     </div>
      </section>
    </div>
  )
}

export default page