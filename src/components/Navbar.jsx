import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart, FiUser, FiMenu, FiX, FiShoppingBag } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

const SUB_LINKS = [
  { label: "Watches", path: "/#watches" },
  { label: "Accessories", path: "/accessories" },
  { label: "Collections", path: "/collections" },
  { label: "Services", path: "/services" },
  { label: "World of Xeroxii", path: "/about" },
  { label: "Women's Jewellery", path: "/womens-jewellery" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItemCount, wishlist } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  const handleAccountClick = () => {
    navigate("/account");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="relative z-30 bg-[#f3f2ef] text-black">
      {/* Utility bar */}
      <div className="border-b border-black/10">
        <div className="page-shell flex items-center justify-between py-3 text-black">
          <div className="hidden gap-6 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/55 sm:flex">
            <Link to="/boutique" className="transition hover:text-black">Find a Boutique</Link>
            <Link to="/contact" className="transition hover:text-black">Contact Us</Link>
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
            <Link to="/" className="text-lg font-semibold uppercase tracking-[0.32em] text-black hover:opacity-70 transition sm:text-xl">
              Xeroxii
            </Link>
          </div>

          <div className="flex items-center gap-5 text-black/70">
            <button 
              type="button" 
              aria-label="Search" 
              className="transition hover:text-black"
              onClick={handleSearchClick}
            >
              <FiSearch size={17} />
            </button>
            <button 
              type="button" 
              aria-label="Wishlist" 
              className="relative transition hover:text-black"
              onClick={handleWishlistClick}
            >
              <FiHeart size={17} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 bg-black text-white text-[0.6rem] rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button 
              type="button" 
              aria-label="Account" 
              className="transition hover:text-black"
              onClick={handleAccountClick}
            >
              <FiUser size={17} />
            </button>
            <button
              type="button"
              aria-label="Shopping cart"
              className="relative transition hover:text-black"
              onClick={handleCartClick}
            >
              <FiShoppingBag size={17} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 bg-black text-white text-[0.6rem] rounded-full font-semibold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-b border-black/10 bg-white/50 backdrop-blur-sm">
          <form onSubmit={handleSearchSubmit} className="page-shell py-4">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search watches, brands, collections..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-black/40 border-b border-black/20 pb-2"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Sub navigation */}
      <nav className={`${menuOpen ? "block" : "hidden"} border-b border-black/10 sm:block`}>
        <ul className="page-shell flex flex-col items-center gap-3 py-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-black/60 sm:flex-row sm:justify-center sm:gap-10 sm:py-3">
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
  );
}
