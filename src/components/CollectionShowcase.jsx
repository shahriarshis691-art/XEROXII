import watch from "../assets/watch.jpg";

const PANELS = [
  {
    alt: "XEROXII chronograph worn on the wrist alongside spare straps",
    position: "20% 30%",
    scale: "scale-100",
  },
  {
    alt: "XEROXII chronograph dial detail with leather strap collection",
    position: "60% 40%",
    scale: "scale-125",
  },
];

export default function CollectionShowcase() {
  return (
    <section id="collections" className="relative bg-white py-20 sm:py-28">
      <div className="page-shell flex justify-center">
        <a
          href="#watches"
          className="inline-flex min-h-12 items-center justify-center border border-black/25 bg-transparent px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
        >
          Shop the Collection
        </a>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px bg-black/10 sm:mt-20 sm:grid-cols-2">
        {PANELS.map((panel) => (
          <div key={panel.alt} className="group relative aspect-[4/3] overflow-hidden bg-[#e9e7e1] sm:aspect-[5/4]">
            <img
              src={watch}
              alt={panel.alt}
              style={{ objectPosition: panel.position }}
              className={`h-full w-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105 ${panel.scale}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
