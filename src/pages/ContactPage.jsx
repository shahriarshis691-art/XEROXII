import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiClock, FiMessageCircle, FiInstagram, FiFacebook } from "react-icons/fi";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Contact XEROXII</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Private consultations for collectors, clients, and luxury gifting.</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-300">Speak with our concierge team for appointments, sourcing, and bespoke requests.</p>
          </div>
        </motion.section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Contact form</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-zinc-300"><span>Name</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
              <label className="space-y-2 text-sm text-zinc-300"><span>Email</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
              <label className="space-y-2 text-sm text-zinc-300"><span>Phone</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
              <label className="space-y-2 text-sm text-zinc-300"><span>Subject</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
            </div>
            <label className="mt-4 block space-y-2 text-sm text-zinc-300"><span>Message</span><textarea className="min-h-32 w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
            <button type="button" className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">Send message</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Visit our studio</p>
            <div className="mt-6 space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3"><FiMapPin className="mt-1 h-5 w-5 text-zinc-300" /><span className="text-sm leading-7 text-zinc-300">88 Avenue de la Paix, Geneva, Switzerland</span></div>
              <div className="flex items-start gap-3"><FiPhone className="mt-1 h-5 w-5 text-zinc-300" /><a href="tel:+18009876543" className="text-sm text-zinc-200 hover:text-white">+1 800 987 6543</a></div>
              <div className="flex items-start gap-3"><FiMail className="mt-1 h-5 w-5 text-zinc-300" /><a href="mailto:hello@xeroxii.com" className="text-sm text-zinc-200 hover:text-white">hello@xeroxii.com</a></div>
              <div className="flex items-start gap-3"><FiClock className="mt-1 h-5 w-5 text-zinc-300" /><span className="text-sm leading-7 text-zinc-300">Mon–Sat: 09:00–19:00</span></div>
            </div>
            <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Connect</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="https://wa.me/18009876543" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200"><FiMessageCircle className="h-4 w-4" /> WhatsApp</a>
                <a href="https://facebook.com" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200"><FiFacebook className="h-4 w-4" /> Facebook</a>
                <a href="https://instagram.com" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200"><FiInstagram className="h-4 w-4" /> Instagram</a>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Google map placeholder</p>
            <div className="mt-6 flex min-h-[260px] items-center justify-center rounded-[1.8rem] border border-dashed border-white/15 bg-white/5 text-zinc-400">Interactive map preview coming soon.</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">FAQ</p>
            <div className="mt-6 space-y-3">
              {[
                "How soon can I receive a piece?",
                "Do you offer private appointments?",
                "Can I order as a gift?",
              ].map((item) => (
                <div key={item} className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">{item}</div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
