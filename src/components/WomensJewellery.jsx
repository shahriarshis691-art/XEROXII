import { Link } from "react-router-dom";

const BANNER_IMAGE = "/images/jewelry/pearl-diamond-floral-clasp-necklace.png";

export default function WomensJewellery() {
  return (
    <section id="jewellery" className="relative w-full overflow-hidden bg-[#fafaf8]">
      {/* Full-width luxury banner */}
      <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[440px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${BANNER_IMAGE}')` }}
        />

        {/* Warm light overlay — preserves burgundy accent legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fafaf8]/94 via-[#fafaf8]/78 to-[#fafaf8]/94"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,250,248,0.15),rgba(250,250,248,0.55)_70%)]"
        />

        {/* Content */}
        <div className="relative flex min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] flex-col items-center justify-center px-6 py-16 text-center sm:py-20 lg:py-24">
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/45">
            Curated Collection
          </p>
          <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.1em] text-[#a3123a] sm:text-4xl sm:tracking-[0.15em] lg:text-5xl">
            Women&apos;s Jewellery
          </h2>
          <Link
            to="/womens-jewellery-listing"
            className="mt-8 border-b border-black/40 pb-0.5 text-sm uppercase tracking-[0.12em] text-black/70 transition hover:border-[#a3123a] hover:text-[#a3123a]"
          >
            Explore Our Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
