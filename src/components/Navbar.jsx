import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
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
  const location = useLocation();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isHome = location.pathname === "/";

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className={`relative z-50 border-b ${isHome ? "border-black/10 bg-transparent text-black" : "sticky top-0 border-white/10 bg-black/75 text-white backdrop-blur-2xl"}`}>
      <div className="page-shell relative flex min-h-16 items-center justify-between py-3 sm:min-h-[4.5rem] sm:py-4">
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden ${isHome ? "border-black/20 bg-black/5 text-black hover:bg-black/10" : "border-white/10 bg-white/5 text-white hover:border-zinc-300 hover:bg-white/10"}`}
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-44 items-center gap-7 md:flex">
          <Link to="/contact" className={`text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition ${isHome ? "text-black/70 hover:text-black" : "text-zinc-400 hover:text-white"}`}>Find a boutique</Link>
          <Link to="/contact" className={`text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition ${isHome ? "text-black/70 hover:text-black" : "text-zinc-400 hover:text-white"}`}>Contact us</Link>
        </div>

        <Link to="/" onClick={handleLinkClick} className={`absolute left-1/2 -translate-x-1/2 text-base font-semibold uppercase tracking-[0.32em] transition sm:text-lg ${isHome ? "text-black" : "text-white"}`}>
          XEROXII
        </Link>

        <div className={`hidden items-center gap-8 md:flex ${isHome ? "mx-auto" : ""}`}>
          {navLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className={({ isActive }) => `text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition ${isHome ? (isActive ? "text-black" : "text-black/60 hover:text-black") : (isActive ? "text-white" : "text-zinc-400 hover:text-white")}`}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className={`ml-auto flex items-center gap-4 ${isHome ? "text-black" : "text-white"}`}>
          <button type="button" aria-label="Search" className="hidden transition hover:opacity-60 sm:inline-flex">
            <FiSearch className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Wishlist" className="hidden transition hover:opacity-60 sm:inline-flex">
            <FiHeart className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Account" className="hidden transition hover:opacity-60 sm:inline-flex">
            <FiUser className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Cart" onClick={onCartOpen} className="relative transition hover:opacity-60">
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
            className={`border-t md:hidden ${isHome ? "border-black/10 bg-[#e7e6e3]" : "border-white/10 bg-black/95"}`}
          >
            <div className="page-shell flex flex-col gap-2 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={`rounded-xl border px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] transition ${isHome ? "border-black/10 bg-black/[0.03] text-black/70 hover:border-black/25 hover:bg-black/10 hover:text-black" : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-white/25 hover:bg-white/10 hover:text-white"}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button type="button" aria-label="Search" className={`inline-flex h-11 items-center justify-center rounded-full border transition ${isHome ? "border-black/10 bg-black/5 text-black hover:bg-black/10" : "border-white/10 bg-white/5 text-white hover:border-zinc-300 hover:bg-white/10"}`}>
                  <FiSearch className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </button>
                <button type="button" aria-label="Cart" onClick={onCartOpen} className={`relative inline-flex h-11 items-center justify-center rounded-full border transition ${isHome ? "border-black/10 bg-black/5 text-black hover:bg-black/10" : "border-white/10 bg-white/5 text-white hover:border-zinc-300 hover:bg-white/10"}`}>
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
