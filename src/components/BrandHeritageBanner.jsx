import { motion } from "framer-motion";

const PANEL = {
  src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1200",
  alt: "Master watchmaker assembling a luxury timepiece in a precision workshop",
};

export default function BrandHeritageBanner() {
  return (
    <section id="heritage" className="relative bg-white py-20 sm:py-28 lg:py-32">
      <div className="page-shell grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[3/4] overflow-hidden bg-[#e9e7e1] sm:aspect-[4/5] lg:aspect-[3/4]"
        >
          <img
            src={PANEL.src}
            alt={PANEL.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
            Our Legacy
          </p>
          <h2 className="section-heading text-3xl font-semibold uppercase tracking-wide text-black sm:text-5xl lg:text-6xl">
            Crafted for<br />
            Eternity
          </h2>
          <p className="max-w-md text-base leading-relaxed text-black/70 sm:text-lg">
            Since 1987, XEROXII has embodied the pinnacle of horological
            excellence. Each timepiece is meticulously hand-assembled by master
            artisans in our Geneva atelier, where tradition meets innovation.
          </p>
          <p className="max-w-md text-base leading-relaxed text-black/70 sm:text-lg">
            From the selection of ethically sourced sapphire crystal to the
            precision of our Swiss movements, every detail reflects our
            uncompromising commitment to perfection.
          </p>
          <a href="#craftsmanship" className="button-primary w-fit">
            Discover Our Craft
          </a>
        </motion.div>
      </div>
    </section>
  );
}
