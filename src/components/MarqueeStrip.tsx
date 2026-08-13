"use client";

export default function MarqueeStrip() {
  const segment = (
    <>
      <span className="mx-11 font-display italic text-[19px] tracking-[0.16em] text-ftm-offwhite/55 whitespace-nowrap">
        Excellence Is The Standard
      </span>
      <span className="font-display text-ftm-linelt/40 mx-2">—</span>
    </>
  );

  return (
    <div className="border-y border-ftm-line bg-ftm-deep py-4 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i}>{segment}</span>
        ))}
      </div>
    </div>
  );
}
