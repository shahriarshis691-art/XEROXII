const PANELS = [
  {
    label: "Diamond Jewellery",
    alt: "Close-up of a luxury diamond and emerald necklace",
    src: "https://images.pexels.com/photos/32988525/pexels-photo-32988525.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "Women's Bag Collection",
    alt: "Luxury black crocodile-leather handbag with matching belt",
    src: "https://images.pexels.com/photos/30975839/pexels-photo-30975839.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function WomensJewellery() {
  return (
    <section id="jewellery" className="relative bg-white py-20 sm:py-28">
      <div className="page-shell flex flex-col items-center text-center">
        <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.35em] text-[#a3123a] sm:text-4xl">
          Women&apos;s Jewellery
        </h2>
        <a
          href="#collections"
          className="mt-6 border-b border-black/40 pb-0.5 text-sm text-black/70 transition hover:border-black hover:text-black"
        >
          Explore Our Collections
        </a>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px bg-black/10 sm:mt-16 sm:grid-cols-2">
        {PANELS.map((panel) => (
          <div key={panel.label} className="group relative aspect-[4/5] overflow-hidden bg-[#e9e7e1]">
            <img
              src={panel.src}
              alt={panel.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
