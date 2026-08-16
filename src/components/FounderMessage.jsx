const FOUNDER = {
  name: "SM Shahriar Walid",
  title: "Founder & CEO, XEROXII",
  quote:
    "At XEROXII, we don't just measure time — we craft timeless statements of precision, heritage, and modern luxury.",
  image: "/images/founder.jpg",
};

export default function FounderMessage() {
  return (
    <section
      aria-labelledby="founder-message-heading"
      className="border-t border-black/10 bg-[#fafaf8]"
    >
      <div className="page-shell py-10 sm:py-14">
        <article className="mx-auto flex max-w-3xl flex-col items-center gap-6 border border-black/10 bg-white px-6 py-8 text-center sm:px-10 sm:py-9 md:flex-row md:items-center md:gap-8 md:text-left">
          <img
            src={FOUNDER.image}
            alt="SM Shahriar Walid, Founder and CEO of XEROXII"
            className="h-20 w-20 shrink-0 rounded-full object-cover object-[center_20%] ring-1 ring-black/15 sm:h-24 sm:w-24"
            loading="lazy"
          />

          <div className="min-w-0 flex-1">
            <p
              id="founder-message-heading"
              className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-black/45"
            >
              Message from the Founder & CEO
            </p>

            <blockquote className="relative mt-3">
              <span
                aria-hidden="true"
                className="font-display text-3xl leading-none text-[#d4af37]/80"
              >
                “
              </span>
              <p className="mt-1 font-display text-lg font-medium leading-relaxed text-[#0a0a0a] sm:text-xl">
                {FOUNDER.quote}
              </p>
            </blockquote>

            <div className="mx-auto mt-5 h-px w-10 bg-black/15 md:mx-0" aria-hidden="true" />

            <p className="mt-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black">
              {FOUNDER.name}
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-black/50">
              {FOUNDER.title}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
