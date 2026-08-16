import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiHeart, FiUser, FiMenu, FiX, FiShoppingBag } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import CartDrawer from "./CartDrawer";

const SUB_LINKS = [
  { label: "Watches", path: "/#watches" },
  { label: "Accessories", path: "/accessories" },
  { label: "Collections", path: "/collections" },
  { label: "Services", path: "/services" },
  { label: "World of Xeroxii", path: "/about" },
  { label: "Women's Jewellery", path: "/womens-jewellery-listing" },
];

const UTILITY_LINKS = [
  { label: "Find a Boutique", path: "/boutique" },
  { label: "Contact Us", path: "/contact" },
];

const iconBtnClass =
  "relative inline-flex h-11 w-10 shrink-0 items-center justify-center text-black/70 transition hover:text-black sm:h-auto sm:w-auto";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    cart,
    cartItemCount,
    cartTotal,
    wishlist,
    removeFromCart,
    updateCartQuantity,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
      closeMenu();
    }
  };

  const handleWishlistClick = () => {
    closeMenu();
    navigate("/wishlist");
  };

  const handleAccountClick = () => {
    closeMenu();
    navigate("/account");
  };

  const handleCartClick = () => {
    setMenuOpen(false);
    setCartOpen(true);
  };

  return (
    <>
      <header className="relative z-40 bg-[#f3f2ef] text-black">
        <div className="border-b border-black/10">
          <div className="page-shell relative flex min-h-14 items-center justify-between py-1.5 sm:min-h-0 sm:py-3">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center text-black sm:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>

              <div className="hidden gap-6 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/55 sm:flex">
                {UTILITY_LINKS.map((link) => (
                  <Link key={link.path} to={link.path} className="transition hover:text-black">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="mb-1 hidden h-2 w-2 rounded-full border border-black/40 sm:block" aria-hidden="true" />
              <Link
                to="/"
                onClick={closeMenu}
                className="pointer-events-auto text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-black transition hover:opacity-70 sm:text-xl sm:tracking-[0.32em]"
              >
                Xeroxii
              </Link>
            </div>

            <div className="flex items-center sm:gap-5">
              <button type="button" aria-label="Search" className={iconBtnClass} onClick={handleSearchClick}>
                <FiSearch size={17} />
              </button>
              <button type="button" aria-label="Wishlist" className={iconBtnClass} onClick={handleWishlistClick}>
                <FiHeart size={17} />
                {wishlist.length > 0 && (
                  <span className="absolute right-0.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-0.5 text-[0.6rem] font-semibold text-white sm:-right-2 sm:-top-2">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button type="button" aria-label="Account" className={`${iconBtnClass} max-[359px]:hidden`} onClick={handleAccountClick}>
                <FiUser size={17} />
              </button>
              <button type="button" aria-label="Shopping cart" className={iconBtnClass} onClick={handleCartClick}>
                <FiShoppingBag size={17} />
                {cartItemCount > 0 && (
                  <span className="absolute right-0.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-0.5 text-[0.6rem] font-semibold text-white sm:-right-2 sm:-top-2">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-b border-black/10 bg-white/50 backdrop-blur-sm">
            <form onSubmit={handleSearchSubmit} className="page-shell py-3 sm:py-4">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search watches, brands, collections..."
                className="min-h-11 w-full border-b border-black/20 bg-transparent pb-2 text-base outline-none placeholder:text-black/40 sm:text-sm"
                autoFocus
              />
            </form>
          </div>
        )}

        <nav className="hidden border-b border-black/10 sm:block">
          <ul className="page-shell flex flex-row items-center justify-center gap-10 py-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-black/60">
            {SUB_LINKS.map((link) => (
              <li key={link.path} className="group relative">
                <Link to={link.path} className="transition hover:text-black">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(19rem,86vw)] flex-col bg-[#f3f2ef] shadow-2xl sm:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-black">Menu</span>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center text-black/70 hover:text-black"
                >
                  <FiX size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-2 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <ul className="flex flex-col">
                  {SUB_LINKS.map((link) => (
                    <li key={link.path} className="border-b border-black/10">
                      <Link
                        to={link.path}
                        className="flex min-h-11 items-center text-[0.7rem] font-medium uppercase tracking-[0.2em] text-black/70 transition hover:text-black"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {UTILITY_LINKS.map((link) => (
                    <li key={link.path} className="border-b border-black/10">
                      <Link
                        to={link.path}
                        className="flex min-h-11 items-center text-[0.7rem] font-medium uppercase tracking-[0.2em] text-black/70 transition hover:text-black"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="border-b border-black/10 max-[359px]:block hidden">
                    <button
                      type="button"
                      onClick={handleAccountClick}
                      className="flex min-h-11 w-full items-center text-[0.7rem] font-medium uppercase tracking-[0.2em] text-black/70 transition hover:text-black"
                    >
                      Account
                    </button>
                  </li>
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        cartTotal={cartTotal}
        cartItemCount={cartItemCount}
      />
    </>
  );
}
