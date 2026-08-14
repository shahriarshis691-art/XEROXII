import { motion } from "framer-motion";

const WATCHES = [
  {
    name: "Chrono Steel Professional",
    title: "Men's Leather Chronograph",
    price: "৳ 1,85,000",
    src: "https://images.pexels.com/photos/28977357/pexels-photo-28977357.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Aurum Diamond Bezel",
    title: "Women's Diamond Collection",
    price: "৳ 3,20,000",
    src: "https://images.pexels.com/photos/35991456/pexels-photo-35991456.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Marine Chronograph",
    title: "Unisex Steel Chronograph",
    price: "৳ 2,10,000",
    src: "https://images.pexels.com/photos/32528932/pexels-photo-32528932.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Heritage Classic",
    title: "Men's Vintage Steel",
    price: "৳ 1,45,000",
    src: "https://images.pexels.com/photos/34894931/pexels-photo-34894931.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Lumière Silver",
    title: "Women's Studio Edition",
    price: "৳ 2,65,000",
    src: "https://images.pexels.com/photos/33511755/pexels-photo-33511755.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Steel Bracelet Classic",
    title: "Men's Chronograph Bracelet",
    price: "৳ 1,95,000",
    src: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

export default function WatchListing() {
  return (
    <section id="watches" className="relative bg-[#f3f2ef] py-20 sm:py-28">
      <div className="page-shell flex flex-col items-center text-center">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
          Our Timepieces
        </p>
        <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-light uppercase tracking-[0.06em] text-black">
          The Watch Collection
        </h2>
      </div>

      <div className="page-shell mt-14 grid grid-cols-3 gap-x-3 gap-y-8 sm:mt-16 sm:gap-x-8 sm:gap-y-14">
        {WATCHES.map((watch, index) => (
          <motion.div
            key={watch.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: (index % 3) * 0.15 }}
            className="group text-center"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#e9e7e1]">
              <img
                src={watch.src}
                alt={watch.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <h3 className="mt-3 text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.08em] text-black sm:mt-5 sm:text-sm sm:tracking-[0.14em]">
              {watch.name}
            </h3>
            <p className="mt-1 text-[0.55rem] uppercase leading-tight tracking-[0.06em] text-black/50 sm:text-[0.6875rem] sm:tracking-[0.16em]">
              {watch.title}
            </p>
            <p className="mt-1.5 text-[0.7rem] font-medium tracking-[0.02em] text-black/80 sm:mt-2 sm:text-sm sm:tracking-[0.04em]">
              {watch.price}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
