export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="aspect-[3/4] ftm-skeleton" />
      <div className="flex flex-col gap-6">
        <div className="h-3 w-20 ftm-skeleton" />
        <div className="h-10 w-3/4 ftm-skeleton" />
        <div className="h-6 w-32 ftm-skeleton" />
        <div className="h-20 w-full ftm-skeleton" />
        <div className="flex gap-2">{Array.from({length:4}).map((_,i)=><div key={i} className="h-9 w-14 ftm-skeleton" />)}</div>
        <div className="flex gap-3"><div className="h-14 flex-1 ftm-skeleton" /><div className="h-14 flex-1 ftm-skeleton" /></div>
      </div>
    </div>
  );
}
