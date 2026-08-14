import { FiImage } from "react-icons/fi";

const PANELS = [
  { label: "Diamond Jewellery", alt: "Diamond jewellery collection" },
  { label: "Women's Bag Collection", alt: "Women's bag collection" },
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
          <div
            key={panel.label}
            className="group relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-[#f5f4f0] to-[#e2dfd7] text-center"
          >
            {/* Placeholder until a real product/lifestyle photo is added here */}
            <FiImage size={28} className="text-black/25" aria-hidden="true" />
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-black/40">{panel.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
