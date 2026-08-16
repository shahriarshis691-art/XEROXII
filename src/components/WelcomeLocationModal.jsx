import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import { COUNTRIES } from "../data/regions";

export default function WelcomeLocationModal() {
  const {
    locationModalOpen,
    countryCode,
    countrySet,
    confirmCountry,
    closeLocationModal,
  } = useContext(AppContext);
  const [draftCode, setDraftCode] = useState(countryCode);

  useEffect(() => {
    if (locationModalOpen) setDraftCode(countryCode);
  }, [locationModalOpen, countryCode]);

  useEffect(() => {
    if (!locationModalOpen) return;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    const handleKey = (e) => {
      if (e.key === "Escape") closeLocationModal();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKey);
    };
  }, [locationModalOpen, closeLocationModal]);

  const handleConfirm = () => {
    confirmCountry(draftCode);
  };

  return (
    <AnimatePresence>
      {locationModalOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeLocationModal}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-location-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden border border-white/12 bg-[#0c0c0c]/95 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
            />

            <button
              type="button"
              onClick={closeLocationModal}
              aria-label="Close welcome dialog"
              className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center text-white/55 transition hover:text-white"
            >
              <FiX size={18} />
            </button>

            <div className="px-6 pb-7 pt-10 sm:px-8 sm:pb-8 sm:pt-12">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
                Luxury Atelier
              </p>
              <h2
                id="welcome-location-title"
                className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.14em] text-white sm:text-[1.65rem]"
              >
                Welcome to Xeroxii
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Select your shopping location and preferred currency for a tailored luxury experience.
              </p>

              <div className="mt-7 space-y-2" role="listbox" aria-label="Shopping location">
                {COUNTRIES.map((country) => {
                  const selected = draftCode === country.code;
                  return (
                    <button
                      key={country.code}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => setDraftCode(country.code)}
                      className={`flex min-h-12 w-full items-center gap-3 border px-4 py-3 text-left transition ${
                        selected
                          ? "border-[#d4af37]/70 bg-white/8"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="text-lg leading-none" aria-hidden="true">
                        {country.flag}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white">
                          {country.name}
                        </span>
                        <span className="mt-0.5 block text-[0.65rem] uppercase tracking-[0.14em] text-white/45">
                          {country.currency} — {country.symbol}
                        </span>
                      </span>
                      {selected && (
                        <FiCheck className="shrink-0 text-[#d4af37]" size={16} aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="mt-7 flex min-h-12 w-full items-center justify-center bg-white px-6 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#d4af37]"
              >
                {countrySet ? "Confirm Selection" : "Continue Shopping"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
