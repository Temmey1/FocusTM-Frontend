export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-8 pt-36 pb-28">
      <div className="text-center mb-16">
        <div className="h-3 w-32 ftm-skeleton mx-auto mb-4" />
        <div className="h-10 w-72 ftm-skeleton mx-auto" />
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-16">
        {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-8 w-20 ftm-skeleton" />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] ftm-skeleton mb-4" />
            <div className="h-3 w-16 ftm-skeleton mb-2" />
            <div className="h-4 w-32 ftm-skeleton mb-2" />
            <div className="h-4 w-20 ftm-skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
