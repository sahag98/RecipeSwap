
import { getRecipeInfo } from '@/utils'
import Image from 'next/image'
import React from 'react'

type searchParamProps= {
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
        <h1 className='font-bold'>Recipe Name:</h1>
      <h2>{title}</h2>
        </div>
        <div>
      <h1 className='font-bold'>Ready In:</h1>
      <p>{readyInMinutes} mins</p>
      </div>
      <div>
      <h1 className='font-bold'>Servings:</h1>
      <p>{servings}</p>
      </div>
      </section>
      
      <section className='flex-1 flex flex-col gap-3'>
       
     <div>
     <h1 className='font-bold'>Instructions:</h1>
      <p className='leading-7 text-justify'>{instructions}</p>
     </div>
     <div>
     <h1 className='font-bold'>Summary:</h1>
      <p className='leading-7 text-justify'>{summary}</p>
     </div>
      
      </section>
    </div>
  )
}

export default page