import Hero from "../components/Hero";
import HeroCampaign from "../components/HeroCampaign";
import Categories from "../components/Categories";
import Features from "../components/Features";
import JewelleryBanner from "../components/JewelleryBanner";
import BagsBanner from "../components/BagsBanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <Hero />
      <HeroCampaign />
      <main className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-12 sm:px-8 lg:px-10 lg:py-24">
        <Categories />
        <Features />
        <JewelleryBanner />
        <BagsBanner />
        <section id="faq" className="rounded-[2.5rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.42em] text-zinc-400">Frequently asked</p>
            <h2 className="section-heading mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Questions from collectors.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["How are the watches delivered?", "Each timepiece is hand-delivered with authentication papers and a private concierge follow-up."],
              ["Can I customize a case finish?", "Yes, select editions can be tailored with bespoke dial, bracelet, and case finishing."],
              ["Do you offer international servicing?", "Our atelier provides international servicing and maintenance for every release."],
              ["Is XEROXII suitable for gifting?", "Absolutely. We offer luxury packaging and private gifting options for special occasions."],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}