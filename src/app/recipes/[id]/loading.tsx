import ScrollTop from "@/components/ScrollTop"

export default function Loading() {

  return (
    <div className='lg:flex gap-10 mt-10'>
      <ScrollTop />
      <section className='flex flex-col flex-2 gap-2'>
        <div className="lg:w-[450px] h-[300px] w-full animate-pulse bg-gray-200 rounded-lg" />
      {/* <Image className='object-contain rounded-md' src={image} alt={`${title} picture`} width={450} height={450}  /> */}
      <div>
        <h1 className='font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md' />
        <h1 className='font-bold bg-gray-200 mb-2 animate-pulse h-6 w-24 rounded-md' />
      {/* <h2>{title}</h2> */}
        </div>
        <div>
        <h1 className='font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md' />
        <p className='font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md' />
      {/* <p>{readyInMinutes} mins</p> */}
      </div>
      <div>
      <h1 className='font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md' />
      <p className='font-bold bg-gray-200 mb-2 animate-pulse h-6 w-6 rounded-md' />
      {/* <p>{servings}</p> */}
      </div>
      <div className="w-full py-6 animate-pulse bg-gray-200 rounded-lg" />
     
      
      </section>
      <section className='flex-1 flex flex-col gap-3'>
       
     <div>
     <h1 className='font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md' />
     <p className='font-bold bg-gray-200 mb-2 animate-pulse h-40 w-full rounded-md' />
      {/* <p className='leading-7 text-justify'>{instructions}</p> */}
     </div>
     <div>
     <h1 className='font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md' />
     <p className='font-bold bg-gray-200 mb-2 animate-pulse h-40 w-full rounded-md leading-7' />
      {/* <p className='leading-7 text-justify'>{parse(summary)}</p> */}
     </div>
      </section>
    </div>
  )
}