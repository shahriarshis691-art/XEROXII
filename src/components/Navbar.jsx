import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiSearch, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

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
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
      <div className="page-shell flex items-center justify-between py-3 sm:py-4">
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
            <NavLink key={link.label} to={link.to} className={({ isActive }) => `text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button type="button" aria-label="Search" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-zinc-300 hover:bg-white/10">
            <FiSearch className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Cart" onClick={onCartOpen} className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-zinc-300 hover:bg-white/10">
            <FiShoppingBag className="h-5 w-5" />
            {itemCount > 0 ? <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-black">{itemCount}</span> : null}
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
            <div className="page-shell flex flex-col gap-2 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={handleLinkClick}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
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
                  {itemCount > 0 ? <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-black">{itemCount}</span> : null}
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
