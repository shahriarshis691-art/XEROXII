import { Link } from "react-router-dom";

export default function WomensJewellery() {
  return (
    <section id="jewellery" className="relative bg-white pb-20 sm:pb-28">
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
    </section>
  );
}
