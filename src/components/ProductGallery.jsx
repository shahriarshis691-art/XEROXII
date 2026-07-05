import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMaximize2, FiPlayCircle } from "react-icons/fi";
import watch from "../assets/watch.jpg";
import hero from "../assets/hero.png";

const galleryImages = [
  { src: watch, alt: "XEROXII chronograph front view" },
  { src: hero, alt: "XEROXII chronograph side view" },
  { src: watch, alt: "XEROXII chronograph close-up" },
];

export default function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const title = product?.title ?? "Chronograph No. 01";

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-3 shadow-[0_35px_120px_rgba(0,0,0,0.45)]">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          onClick={() => setPreviewOpen(true)}
          className="absolute right-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-md"
        >
          <FiMaximize2 className="h-4 w-4" /> Fullscreen
        </motion.button>

        <motion.img
          key={activeImage.alt}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          src={activeImage.src}
          alt={activeImage.alt}
          loading="lazy"
          className="h-[460px] w-full rounded-[1.75rem] object-cover object-center sm:h-[560px]"
        />

        <div className="absolute inset-x-0 bottom-0 rounded-b-[1.75rem] bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.32em] text-zinc-300">Limited Edition</p>
          <p className="mt-2 text-xl font-semibold text-white">{title}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {galleryImages.map((image, index) => (
          <button
            key={image.alt}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${activeImage.alt === image.alt ? "border-white" : "border-white/10"}`}
          >
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
            {index === 2 ? (
              <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white">
                <FiPlayCircle className="h-6 w-6" />
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-zinc-400">
        <span>360° view available on request</span>
        <button type="button" className="rounded-full border border-white/10 px-4 py-2 text-white transition hover:border-white/30 hover:bg-white/10">
          Preview animation
        </button>
      </div>

      <AnimatePresence>
        {previewOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
            <motion.button initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} type="button" onClick={() => setPreviewOpen(false)} className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              Close
            </motion.button>
            <motion.img initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} src={activeImage.src} alt={activeImage.alt} className="max-h-[85vh] max-w-[90vw] rounded-[2rem] object-contain" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
