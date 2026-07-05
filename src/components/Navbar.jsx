import { motion } from "framer-motion";
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
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <button type="button" aria-label="Open menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-zinc-300 hover:bg-white/10">
          <FiMenu className="h-5 w-5" />
        </button>

        <Link to="/" className="text-sm font-semibold uppercase tracking-[0.45em] text-white">
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
    </motion.header>
  );
}
