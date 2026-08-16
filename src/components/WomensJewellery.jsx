import { Link } from "react-router-dom";

const PANELS = [
  {
    label: "Necklace Showcase",
    alt: "Luxury diamond necklace detail shot",
    src: "https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    label: "Earrings Showcase",
    alt: "Luxury gold and gemstone earrings product shot",
    src: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function WomensJewellery() {
  return (
    <section id="jewellery" className="relative bg-white">
      <div className="flex flex-col items-center text-center pt-20 sm:pt-28">
        <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.15em] text-[#a3123a] sm:text-4xl">
          Women&apos;s Jewellery
        </h2>
        <Link
          to="/womens-jewellery-listing"
          className="mt-6 border-b border-black/40 pb-0.5 text-sm text-black/70 transition hover:border-black hover:text-black"
        >
          Explore Our Collections
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:mt-16 sm:grid-cols-2">
        {PANELS.map((panel) => (
          <div
            key={panel.label}
            className="group relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] sm:aspect-auto sm:h-[80vh]"
          >
            <img
              src={panel.src}
              alt={panel.alt}
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
