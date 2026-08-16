import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram, FaYoutube } from "react-icons/fa";
import toast from "react-hot-toast";

const FOOTER_LINKS = {
  company: [
    { label: "Our Story", path: "/about" },
    { label: "Reviews", path: "/reviews" },
    { label: "Blog", path: "/blog" },
    { label: "VIP Text Club", path: "/vip" },
    { label: "100% Authentic", path: "/authenticity" },
    { label: "contact@xeroxii.com", href: "mailto:contact@xeroxii.com" },
  ],
  shop: [
    { label: "Brands", path: "/" },
    { label: "Collections", path: "/collections" },
    { label: "Men", path: "/men" },
    { label: "Women", path: "/womens-jewellery" },
    { label: "New", path: "/new" },
    { label: "Sale", path: "/sale" },
  ],
  customerService: [
    { label: "My Account", path: "/account" },
    { label: "Navidium Protection", path: "/protection" },
    { label: "Shipping", path: "/shipping" },
    { label: "Returns", path: "/returns" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact Us", path: "/contact" },
  ],
  legal: [
    { label: "Terms of Service", path: "/terms" },
    { label: "Accessibility", path: "/accessibility" },
    { label: "Privacy Policy", path: "/privacy" },
  ],
};

const SOCIAL_LINKS = [
  { Icon: FaFacebook, label: "Facebook", url: "#" },
  { Icon: FaTwitter, label: "Twitter", url: "#" },
  { Icon: FaPinterest, label: "Pinterest", url: "#" },
  { Icon: FaInstagram, label: "Instagram", url: "#" },
  { Icon: FaYoutube, label: "YouTube", url: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    
    // Simulate subscription
    setTimeout(() => {
      localStorage.setItem("xeroxii_subscriber", email);
      toast.success("Thanks for subscribing!");
      setEmail("");
      setIsSubscribing(false);
    }, 500);
  };

  return (
    <footer className="bg-white text-black">
      <div className="page-shell pt-12 pb-8 lg:pt-16 lg:pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-xs font-medium uppercase tracking-widest text-black">
              Sign Up and Save
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5">
              <div className="flex items-center border-b border-black pb-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
                  disabled={isSubscribing}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="ml-3 flex-shrink-0 text-black transition hover:text-black/70 disabled:opacity-50"
                  disabled={isSubscribing}
                >
                  <FiMail size={18} />
                </button>
              </div>
            </form>
            <div className="mt-6 flex items-center gap-5">
              {SOCIAL_LINKS.map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  className="text-black/70 transition hover:text-black"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-black">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-black/70 transition hover:text-black"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-sm text-black/70 transition hover:text-black"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-black">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.shop.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-black">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.customerService.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-black">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-8 text-center">
          <span className="text-xl font-semibold uppercase tracking-widest text-black">
            Xeroxii<span className="text-black/40">.</span>com
          </span>
        </div>
      </div>
    </footer>
  );
}
