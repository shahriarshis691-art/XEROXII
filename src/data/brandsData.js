export const SISTER_BRANDS = [
  {
    id: "shis-fashion",
    slug: "shis-fashion",
    name: "SHIS FASHION",
    shortName: "Shis Fashion",
    category: "Luxury Men's & Premium Apparel",
    tagline: "Refined tailoring for the modern gentleman.",
    description:
      "SHIS FASHION curates premium menswear with a focus on impeccable cuts, elevated fabrics, and timeless silhouettes. From formal occasionwear to refined casual collections, every piece reflects disciplined craftsmanship and contemporary luxury.",
    story: [
      "Founded with a vision to redefine premium apparel in South Asia, SHIS FASHION blends heritage tailoring techniques with modern design language.",
      "Each collection is developed through meticulous fabric sourcing, precision pattern-making, and quality control standards that meet international luxury benchmarks.",
      "The brand serves discerning clients who value understated elegance, lasting construction, and a wardrobe built for both boardroom and evening occasions.",
    ],
    logo: "SF",
    accent: "#1a1a1a",
    heroBanner:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1920&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1490114538077-2821ff25aa93?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      phone: "+880 1711-000101",
      email: "contact@shisfashion.com",
      address: "House 12, Road 45, Gulshan Avenue, Dhaka 1212, Bangladesh",
    },
    website: "https://shisfashion.com",
  },
  {
    id: "ceravo",
    slug: "ceravo",
    name: "CERAVO",
    shortName: "Ceravo",
    category: "Ceramic & Modern Lifestyle Innovations",
    tagline: "Where material science meets everyday elegance.",
    description:
      "CERAVO pioneers ceramic-infused lifestyle products designed for durability, purity, and refined aesthetics. From tableware to modern home essentials, Ceravo reimagines daily rituals through innovative material engineering.",
    story: [
      "Ceravo was established at the intersection of design innovation and advanced ceramics, creating products that are as functional as they are sculptural.",
      "The brand's research-led approach ensures heat retention, surface integrity, and minimalist forms suited to contemporary living spaces.",
      "Ceravo collections are crafted for design-conscious households and hospitality environments seeking elevated, long-lasting lifestyle solutions.",
    ],
    logo: "CV",
    accent: "#3d3d3d",
    heroBanner:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      phone: "+880 1711-000202",
      email: "hello@ceravo.com",
      address: "Innovation Tower, Level 8, Banani, Dhaka 1213, Bangladesh",
    },
    website: "https://ceravo.com",
  },
  {
    id: "ghorwa-tea",
    slug: "ghorwa-tea",
    name: "GHORWA TEA",
    shortName: "Ghorwa Tea",
    category: "Authentic & Premium Heritage Tea",
    tagline: "Single-origin heritage, steeped in tradition.",
    description:
      "GHORWA TEA celebrates the art of fine leaf cultivation and slow-crafted blending. Sourced from premier gardens and processed with generational expertise, each blend delivers depth, aroma, and a truly authentic tea experience.",
    story: [
      "Rooted in Bangladesh's rich tea heritage, Ghorwa Tea partners directly with estate growers to preserve terroir-driven character in every harvest.",
      "From orthodox whole-leaf selections to signature house blends, the brand honours traditional processing while meeting modern quality standards.",
      "Ghorwa Tea is crafted for connoisseurs, hospitality partners, and everyday rituals that demand warmth, clarity, and premium flavour.",
    ],
    logo: "GT",
    accent: "#2d5016",
    heroBanner:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1920&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576092762793-43a0615fb671?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1597318181409-36f4d08db266?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      phone: "+880 1711-000303",
      email: "info@ghorwatea.com",
      address: "Tea Estate Road, Sreemangal, Moulvibazar 3210, Bangladesh",
    },
    website: "https://ghorwatea.com",
  },
];

export function getSisterBrandBySlug(slug) {
  return SISTER_BRANDS.find((b) => b.slug === slug) ?? null;
}

export function getAllSisterBrandSlugs() {
  return SISTER_BRANDS.map((b) => b.slug);
}
