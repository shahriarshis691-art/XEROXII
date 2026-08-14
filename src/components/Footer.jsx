import { FiMail } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram, FaYoutube } from "react-icons/fa";

const FOOTER_LINKS = {
  company: [
    { label: "Our Story", href: "#" },
    { label: "Reviews", href: "#" },
    { label: "Blog", href: "#" },
    { label: "VIP Text Club", href: "#" },
    { label: "100% Authentic", href: "#" },
    { label: "contact@xeroxii.com", href: "mailto:contact@xeroxii.com" },
  ],
  shop: [
    { label: "Brands", href: "#" },
    { label: "Collections", href: "#" },
    { label: "Men", href: "#" },
    { label: "Women", href: "#" },
    { label: "New", href: "#" },
    { label: "Sale", href: "#" },
  ],
  customerService: [
    { label: "My Account", href: "#" },
    { label: "Navidium Protection", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Accessibility", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const SOCIAL_ICONS = [
  { Icon: FaFacebook, label: "Facebook" },
  { Icon: FaTwitter, label: "Twitter" },
  { Icon: FaPinterest, label: "Pinterest" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
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
            <div className="mt-5 flex items-center border-b border-black pb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="ml-3 flex-shrink-0 text-black transition hover:text-black/70"
              >
                <FiMail size={18} />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-5">
              {SOCIAL_ICONS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
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
                  <a
                    href={item.href}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {item.label}
                  </a>
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
                  <a
                    href={item.href}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {item.label}
                  </a>
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
                  <a
                    href={item.href}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {item.label}
                  </a>
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
                  <a
                    href={item.href}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {item.label}
                  </a>
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
