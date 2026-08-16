const PANELS = [
  {
    label: "Men's Collection",
    alt: "Luxury men's chronograph wristwatch with leather strap",
    src: "https://images.pexels.com/photos/28977357/pexels-photo-28977357.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "Women's Collection",
    alt: "Luxury women's gold wristwatch with diamond-studded bezel",
    src: "https://images.pexels.com/photos/35991456/pexels-photo-35991456.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function CollectionShowcase() {
  return (
    <section id="collections" className="relative bg-white py-20 sm:py-28">
      <div className="page-shell flex justify-center">
        <a
          href="#watches"
          className="inline-flex min-h-12 w-full max-w-xs items-center justify-center border border-black/25 bg-transparent px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white sm:w-auto"
        >
          Shop the Collection
        </a>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px bg-black/10 sm:mt-20 sm:grid-cols-2">
        {PANELS.map((panel) => (
          <div key={panel.label} className="group relative aspect-[4/3] overflow-hidden bg-[#e9e7e1] sm:aspect-[5/4]">
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
