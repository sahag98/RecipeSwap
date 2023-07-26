import ScrollTop from "@/components/ScrollTop";

export default function Loading() {
  return (
    <div>
      <ScrollTop />
      <section className="flex flex-col flex-2 gap-2">
        <div className="h-80 w-full animate-pulse bg-gray-200 rounded-lg" />
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md" />
            <h1 className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md" />
          </div>
          <h1 className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-24 rounded-md" />
        </div>
        <div>
          <h1 className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md" />
          <p className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md" />
        </div>
        <div>
          <h1 className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md" />
          <p className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-6 rounded-md" />
        </div>
        <div className="w-full py-6 animate-pulse bg-gray-200 rounded-lg" />
      </section>
      <section className="flex-1 flex flex-col gap-3">
        <div>
          <h1 className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md" />
          <p className="font-bold bg-gray-200 mb-2 animate-pulse h-40 w-full rounded-md" />
          {/* <p className='leading-7 text-justify'>{instructions}</p> */}
        </div>
        <div>
          <h1 className="font-bold bg-gray-200 mb-2 animate-pulse h-6 w-20 rounded-md" />
          <p className="font-bold bg-gray-200 mb-2 animate-pulse h-40 w-full rounded-md leading-7" />
        </div>
      </section>
    </div>
  );
}
