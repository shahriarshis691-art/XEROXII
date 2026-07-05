export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 text-sm text-zinc-400 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-base uppercase tracking-[0.35em] text-white">XEROXII</span>
          <p className="max-w-2xl leading-8 text-zinc-400">
            Swiss-inspired horology for those who value elegance, precision, and deliberate design.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-4 uppercase tracking-[0.28em] text-white/70">Collections</p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>Chronograph</li>
              <li>GMT</li>
              <li>Moonphase</li>
            </ul>
          </div>
          <div>
            <p className="mb-4 uppercase tracking-[0.28em] text-white/70">Service</p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>Private consultations</li>
              <li>Worldwide delivery</li>
              <li>Aftercare</li>
            </ul>
          </div>
          <div>
            <p className="mb-4 uppercase tracking-[0.28em] text-white/70">Contact</p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>hello@xeroxii.com</li>
              <li>+1 800 987 6543</li>
            </ul>
          </div>
        </div>

        <p className="pt-4 text-xs uppercase tracking-[0.32em] text-zinc-600">© 2026 XEROXII. All rights reserved.</p>
      </div>
    </footer>
  );
}
