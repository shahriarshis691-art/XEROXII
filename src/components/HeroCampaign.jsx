import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import watch from "../assets/watch.jpg";

export default function HeroCampaign() {
  return (
    <section className="bg-[#f8f8f6] px-4 py-20 text-[#252a35] sm:px-8 sm:py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.38em] text-[#b20d31] sm:text-sm">XEROXII / Signature chronograph</p>
        <h2 className="mt-6 text-4xl font-light uppercase leading-[1.1] tracking-[0.12em] text-[#b20d31] sm:text-5xl lg:text-6xl">Chronograph No. 01</h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 tracking-[0.08em] text-[#303746] sm:text-base">
          Presented in three considered sizes, this modern timepiece pairs a quiet black dial with polished steel and a precise movement made for daily ritual.
        </p>
        <Link to="/shop" className="mt-10 inline-flex min-h-14 items-center justify-center border border-[#d8d8d4] px-8 text-xs font-medium uppercase tracking-[0.2em] text-[#303746] transition hover:border-[#b20d31] hover:bg-[#b20d31] hover:text-white">
          Discover the collection
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mx-auto mt-20 max-w-6xl overflow-hidden sm:mt-28">
        <img src={watch} alt="XEROXII Chronograph No. 01 on wrist" className="aspect-[16/8] w-full object-cover object-center grayscale-[0.15] sm:aspect-[16/7]" />
      </motion.div>
    </section>
  );
}
