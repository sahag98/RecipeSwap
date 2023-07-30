export default function Loading() {
  return (
    <div>
      <section className="flex flex-col justify-center items-center flex-2 gap-2">
        <div className="w-32 h-32 rounded-full animate-pulse bg-gray-200" />
        <div className="flex flex-col justify-between gap-8 items-center">
          <h1 className="font-bold bg-gray-200 animate-pulse h-6 w-20 rounded-md" />
          <h1 className="font-bold bg-gray-200  animate-pulse h-6 w-20 rounded-md" />
        </div>

        <div className="w-full h-32 mb-3 bg-gray-200 animate-pulse" />
        <div className="w-full h-32 mb-3 bg-gray-200 animate-pulse" />
        <div className="w-full h-32 mb-3 bg-gray-200 animate-pulse" />
        <div className="w-full h-32 mb-3 bg-gray-200 animate-pulse" />
      </section>
    </div>
  );
}
