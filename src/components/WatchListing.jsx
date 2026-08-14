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
  {
    name: "Titan Chrono Bracelet",
    title: "Men's Steel Chronograph",
    price: "৳ 2,25,000",
    src: "https://images.pexels.com/photos/33532635/pexels-photo-33532635.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Noir Executive",
    title: "Men's Black Dial Display",
    price: "৳ 1,75,000",
    src: "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Rosé Élan",
    title: "Women's Rose Gold Edition",
    price: "৳ 2,95,000",
    src: "https://images.pexels.com/photos/35080771/pexels-photo-35080771.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Satin Gold Duo",
    title: "Women's Gold & Silver Set",
    price: "৳ 3,45,000",
    src: "https://images.pexels.com/photos/31050004/pexels-photo-31050004.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Alderwood Classic",
    title: "Men's Leather Strap Edition",
    price: "৳ 1,55,000",
    src: "https://images.pexels.com/photos/36812409/pexels-photo-36812409.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Walnut Heritage",
    title: "Unisex Brown Leather Band",
    price: "৳ 1,65,000",
    src: "https://images.pexels.com/photos/34602509/pexels-photo-34602509.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Celestial Diamond",
    title: "Women's Diamond Encrusted",
    price: "৳ 4,50,000",
    src: "https://images.pexels.com/photos/8854152/pexels-photo-8854152.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Heritage Silver",
    title: "Unisex Vintage Silver",
    price: "৳ 2,80,000",
    src: "https://images.pexels.com/photos/1467188/pexels-photo-1467188.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Chronograph Elite",
    title: "Men's Sports Chronograph",
    price: "৳ 3,10,000",
    src: "https://images.pexels.com/photos/3419331/pexels-photo-3419331.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Midnight Black",
    title: "Men's Premium Black Dial",
    price: "৳ 2,45,000",
    src: "https://images.pexels.com/photos/16739804/pexels-photo-16739804.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Celestial Rose",
    title: "Women's Rose Gold Luxury",
    price: "৳ 3,75,000",
    src: "https://images.pexels.com/photos/3809175/pexels-photo-3809175.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Nomad Leather",
    title: "Men's Explorer Edition",
    price: "৳ 1,90,000",
    src: "https://images.pexels.com/photos/5058216/pexels-photo-5058216.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Prestige Black",
    title: "Men's Ceramic Chronograph",
    price: "৳ 3,55,000",
    src: "https://images.pexels.com/photos/19810831/pexels-photo-19810831.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    name: "Mechanical Art",
    title: "Unisex Skeleton Dial",
    price: "৳ 4,20,000",
    src: "https://images.pexels.com/photos/30250930/pexels-photo-30250930.jpeg?auto=compress&cs=tinysrgb&w=900",
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

      <div className="page-shell mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14">
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
