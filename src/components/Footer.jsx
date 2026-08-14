import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="page-shell flex flex-col gap-8 text-sm text-zinc-400">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-white">XEROXII</Link>
          <p className="max-w-2xl leading-8 text-zinc-400">
            Swiss-inspired horology for those who value elegance, precision, and deliberate design.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-4 uppercase tracking-[0.28em] text-white/70">Collections</p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link to="/shop" className="transition hover:text-white">Chronograph</Link></li>
              <li><Link to="/shop" className="transition hover:text-white">GMT</Link></li>
              <li><Link to="/shop" className="transition hover:text-white">Moonphase</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 uppercase tracking-[0.28em] text-white/70">Service</p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link to="/contact" className="transition hover:text-white">Private consultations</Link></li>
              <li><Link to="/contact" className="transition hover:text-white">Worldwide delivery</Link></li>
              <li><Link to="/contact" className="transition hover:text-white">Aftercare</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 uppercase tracking-[0.28em] text-white/70">Contact</p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="mailto:hello@xeroxii.com" className="transition hover:text-white">hello@xeroxii.com</a></li>
              <li><a href="tel:+18009876543" className="transition hover:text-white">+1 800 987 6543</a></li>
            </ul>
          </div>
        </div>

        <p className="pt-4 text-xs uppercase tracking-[0.32em] text-zinc-600">© 2026 XEROXII. All rights reserved.</p>
      </div>
    </footer>
  );
}
