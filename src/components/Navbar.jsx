import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMenu, FiSearch, FiShoppingBag } from "react-icons/fi";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Watches", to: "/shop" },
  { label: "Jewellery", to: "/jewellery" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Gifts", to: "/gifts" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar({ onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4 lg:px-10">
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-zinc-300 hover:bg-white/10 md:hidden"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="hidden h-11 w-11 md:block" aria-hidden="true" />

        <Link to="/" onClick={handleLinkClick} className="text-sm font-semibold uppercase tracking-[0.35em] text-white sm:tracking-[0.45em]">
          XEROXII
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className="text-sm uppercase tracking-[0.28em] text-zinc-300 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button type="button" aria-label="Search" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-zinc-300 hover:bg-white/10">
            <FiSearch className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Cart" onClick={onCartOpen} className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-zinc-300 hover:bg-white/10">
            <FiShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-black">
              1
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-white/10 bg-black/95 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={handleLinkClick}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm uppercase tracking-[0.22em] text-zinc-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button type="button" aria-label="Search" className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-zinc-300 hover:bg-white/10">
                  <FiSearch className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </button>
                <button type="button" aria-label="Cart" onClick={onCartOpen} className="relative inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-zinc-300 hover:bg-white/10">
                  <FiShoppingBag className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-black">
                    1
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
