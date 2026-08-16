import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiX, FiExternalLink, FiGlobe } from "react-icons/fi";
import Seo from "../components/Seo";
import { getSisterBrandBySlug, normalizeGalleryItem } from "../data/brandsData";

function BrandLogoMark({ brand, className = "" }) {
  if (brand.logoImage) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-sm border border-white/20 p-4 backdrop-blur-md ${className}`}
        style={{ backgroundColor: `${brand.logoBg}cc` }}
      >
        <img
          src={brand.logoImage}
          alt={`${brand.name} logo`}
          className="max-h-16 w-auto max-w-[200px] object-contain sm:max-h-20"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex h-16 w-16 items-center justify-center border border-white/30 bg-white/10 text-sm font-bold tracking-[0.22em] text-white backdrop-blur-md ${className}`}>
      {brand.logo}
    </div>
  );
}

export default function BrandDetailPage() {
  const { slug } = useParams();
  const brand = getSisterBrandBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gallery = brand?.gallery?.map(normalizeGalleryItem) ?? [];

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

  const activeItem = lightboxIndex !== null ? gallery[lightboxIndex] : null;

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      <Seo
        title={brand.shortName}
        description={brand.description}
        path={`/brands/${brand.slug}`}
        image={brand.heroBanner}
      />

      {/* Glassmorphic hero */}
      <section className="relative min-h-[380px] overflow-hidden bg-[#0a0a0a] sm:min-h-[460px]">
        <img
          src={brand.heroBanner}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/70" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        <div className="page-shell relative flex min-h-[380px] flex-col justify-end py-12 sm:min-h-[460px] sm:py-16">
          <nav className="mb-8 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/50">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">Sister Ventures</span>
            <span aria-hidden="true">/</span>
            <span className="text-white">{brand.shortName}</span>
          </nav>

          <div className="rounded-sm border border-white/15 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <BrandLogoMark brand={brand} className="mb-5" />
                <h1 className="text-3xl font-bold uppercase tracking-[0.12em] text-white sm:text-4xl lg:text-5xl">
                  {brand.name}
                </h1>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55 sm:text-sm">
                  {brand.category}
                </p>
                <p className="mt-4 max-w-2xl text-sm uppercase tracking-[0.14em] text-white/80 sm:text-base">
                  {brand.tagline}
                </p>
              </div>
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 border border-white bg-white px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-transparent hover:text-white sm:px-8 sm:text-xs"
              >
                {brand.websiteCta || "Visit Website"}
                <FiExternalLink size={14} />
              </a>
            </div>
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

      {/* Gallery — 3-column grid */}
      <section className="border-t border-black/10 bg-white py-14 sm:py-20">
        <div className="page-shell">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/45">
            Showcase
          </p>
          <h2 className="mt-3 mb-10 text-3xl font-light uppercase tracking-wide text-black">
            Curated Gallery
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {gallery.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/5] overflow-hidden bg-[#e9e7e1] text-left"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition group-hover:opacity-90" />
                <p className="absolute bottom-4 left-4 right-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  {item.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & social */}
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

        {brand.social?.length > 0 && (
          <div className="mt-10 border border-black/10 bg-white p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-black/50 mb-4">Connect</p>
            <div className="flex flex-wrap gap-3">
              {brand.social.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black transition hover:border-black hover:bg-black hover:text-white"
                >
                  <FiGlobe size={14} />
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-black bg-black px-10 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-black"
          >
            {brand.websiteCta || "Visit Website"}
            <FiExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
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
              key={activeItem.src}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              src={activeItem.src}
              alt={activeItem.title}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-white/80">{activeItem.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
