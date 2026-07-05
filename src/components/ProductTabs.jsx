import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "description",
    label: "Description",
    content: "An architectural chronograph designed with a balanced dial, platinum bezel, and a sculptural case profile. Every curve is shaped to feel effortless yet unmistakably luxurious.",
  },
  {
    id: "specifications",
    label: "Specifications",
    content: "Swiss-inspired movement, stainless steel and ceramic construction, sapphire crystal, 42mm case, 100m water resistance, and a 2-year international warranty.",
  },
  {
    id: "shipping",
    label: "Shipping",
    content: "Complimentary express delivery, secure packaging, and live concierge support for every order placed through the XEROXII atelier.",
  },
  {
    id: "warranty",
    label: "Warranty",
    content: "Each XEROXII timepiece is backed by a 2-year official manufacturer warranty and access to global servicing partners.",
  },
  {
    id: "reviews",
    label: "Reviews",
    content: "Collectors praise the comfort, finish, and understated presence of the collection. Verified buyers regularly highlight the premium packaging and attention to detail.",
  },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");
  const activeContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.24em] transition ${activeTab === tab.id ? "bg-white text-black" : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/30"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeContent.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/5 p-6 text-base leading-8 text-zinc-300">
          {activeContent.content}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
