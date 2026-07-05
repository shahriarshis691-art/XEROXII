import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductTabs from "../components/ProductTabs";
import ReviewSection from "../components/ReviewSection";
import DeliveryInfo from "../components/DeliveryInfo";
import RelatedProducts from "../components/RelatedProducts";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import { products } from "../data/products";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((entry) => entry.id === Number(id)) || products[0];

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main id="home" className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </motion.section>

        <section className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Key features</p>
              <h2 className="section-heading mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Crafted for a lifetime of wear.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  ["Sapphire Crystal Glass", "Scratch-resistant, clarity-rich protection"],
                  ["Japanese Quartz Movement", "Accurate, dependable performance"],
                  ["Stainless Steel Case", "Polished and durable construction"],
                  ["Water Resistant", "Designed for daily resilience"],
                  ["2 Years Warranty", "Official service and support"],
                  ["Premium Packaging", "Presented with soft-touch luxury finish"],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-base font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Specifications</p>
              <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-white/10">
                <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                  <tbody className="divide-y divide-white/10 bg-white/5 text-zinc-300">
                    {[
                      ["Movement", "Japanese quartz"],
                      ["Case Material", "Stainless steel"],
                      ["Strap Material", "Ceramic / leather"],
                      ["Glass", "Sapphire crystal"],
                      ["Dial Diameter", "40 mm"],
                      ["Thickness", "10.8 mm"],
                      ["Weight", "74 g"],
                      ["Water Resistance", "100 m"],
                      ["Warranty", "2 years"],
                      ["Country", "Swiss made"],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="px-5 py-4 font-medium text-white">{label}</td>
                        <td className="px-5 py-4 text-zinc-400">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <ProductTabs />
          <DeliveryInfo />
          <ReviewSection />
          <RelatedProducts />
          <CTASection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
