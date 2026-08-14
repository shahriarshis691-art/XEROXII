import { useState } from "react";
import { FiSearch, FiHeart, FiUser, FiMenu, FiX } from "react-icons/fi";

const SUB_LINKS = ["Watches", "Accessories", "Collections", "Services", "World of Xeroxii"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-30 bg-[#f3f2ef] text-black">
      {/* Utility bar */}
      <div className="border-b border-black/10">
        <div className="page-shell flex items-center justify-between py-3 text-black">
          <div className="hidden gap-6 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/55 sm:flex">
            <a href="#boutique" className="transition hover:text-black">Find a Boutique</a>
            <a href="#contact" className="transition hover:text-black">Contact Us</a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-black sm:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <div className="flex flex-col items-center">
            <span className="mb-1 h-2 w-2 rounded-full border border-black/40" aria-hidden="true" />
            <span className="text-lg font-semibold uppercase tracking-[0.32em] text-black sm:text-xl">
              Xeroxii
            </span>
          </div>

          <div className="flex items-center gap-5 text-black/70">
            <button type="button" aria-label="Search" className="transition hover:text-black">
              <FiSearch size={17} />
            </button>
            <button type="button" aria-label="Wishlist" className="transition hover:text-black">
              <FiHeart size={17} />
            </button>
            <button type="button" aria-label="Account" className="transition hover:text-black">
              <FiUser size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Sub navigation */}
      <nav className={`${menuOpen ? "block" : "hidden"} border-b border-black/10 sm:block`}>
        <ul className="page-shell flex flex-col items-center gap-3 py-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-black/60 sm:flex-row sm:justify-center sm:gap-10 sm:py-3">
          {SUB_LINKS.map((link) => (
            <li key={link} className="group relative">
              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="transition hover:text-black">
                {link}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
