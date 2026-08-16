import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiX, FiExternalLink } from "react-icons/fi";
import Seo from "../components/Seo";
import { getSisterBrandBySlug } from "../data/brandsData";

export default function BrandDetailPage() {
  const { slug } = useParams();
  const brand = getSisterBrandBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex]);

  if (!brand) {
    return (
      <main className="min-h-screen bg-[#fafaf8] py-20">
        <div className="page-shell text-center">
          <h1 className="text-3xl font-light text-black mb-4">Brand Not Found</h1>
          <Link to="/" className="inline-block px-8 py-3 bg-black text-white text-sm uppercase tracking-[0.16em]">
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      <Seo
        title={brand.shortName}
        description={brand.description}
        path={`/brands/${brand.slug}`}
        image={brand.heroBanner}
      />

      {/* Hero header */}
      <section className="relative min-h-[340px] overflow-hidden bg-[#0a0a0a] sm:min-h-[420px]">
        <img
          src={brand.heroBanner}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/40" />
        <div className="page-shell relative flex min-h-[340px] flex-col justify-end py-12 sm:min-h-[420px] sm:py-16">
          <nav className="mb-8 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/50">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">Sister Ventures</span>
            <span aria-hidden="true">/</span>
            <span className="text-white">{brand.shortName}</span>
          </nav>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center border border-white/30 bg-white/10 text-sm font-bold tracking-[0.22em] text-white backdrop-blur-sm">
                {brand.logo}
              </div>
              <h1 className="text-4xl font-bold uppercase tracking-[0.12em] text-white sm:text-5xl lg:text-6xl">
                {brand.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm uppercase tracking-[0.16em] text-white/75 sm:text-base">
                {brand.tagline}
              </p>
            </div>
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-white bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
            >
              Visit Official Website
              <FiExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="page-shell py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/45">
              Brand Story
            </p>
            <h2 className="mt-3 text-3xl font-light uppercase tracking-wide text-black">
              About {brand.shortName}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/70">{brand.description}</p>
          </div>
          <div className="space-y-5 border-l border-black/10 pl-0 lg:pl-10">
            {brand.story.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-sm leading-relaxed text-black/65"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-black/10 bg-white py-14 sm:py-20">
        <div className="page-shell">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/45">
            Showcase
          </p>
          <h2 className="mt-3 mb-10 text-3xl font-light uppercase tracking-wide text-black">
            Curated Gallery
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {brand.gallery.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/5] overflow-hidden bg-[#e9e7e1]"
              >
                <img
                  src={src}
                  alt={`${brand.name} showcase ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="page-shell py-14 sm:py-20">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/45">
          Contact
        </p>
        <h2 className="mt-3 mb-10 text-3xl font-light uppercase tracking-wide text-black">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="border border-black/10 bg-white p-6">
            <FiPhone className="mb-4 text-black/60" size={20} />
            <p className="text-xs uppercase tracking-[0.16em] text-black/50 mb-2">Phone</p>
            <a href={`tel:${brand.contact.phone.replace(/\s/g, "")}`} className="text-sm font-medium text-black hover:opacity-70">
              {brand.contact.phone}
            </a>
          </div>
          <div className="border border-black/10 bg-white p-6">
            <FiMail className="mb-4 text-black/60" size={20} />
            <p className="text-xs uppercase tracking-[0.16em] text-black/50 mb-2">Email</p>
            <a href={`mailto:${brand.contact.email}`} className="text-sm font-medium text-black hover:opacity-70">
              {brand.contact.email}
            </a>
          </div>
          <div className="border border-black/10 bg-white p-6">
            <FiMapPin className="mb-4 text-black/60" size={20} />
            <p className="text-xs uppercase tracking-[0.16em] text-black/50 mb-2">Headquarters</p>
            <p className="text-sm leading-relaxed text-black/75">{brand.contact.address}</p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-white/80 hover:text-white"
            >
              <FiX size={24} />
            </button>
            <motion.img
              key={brand.gallery[lightboxIndex]}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              src={brand.gallery[lightboxIndex]}
              alt={`${brand.name} enlarged showcase`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
