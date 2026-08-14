import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TESTIMONIALS = [
  {
    quote:
      "The attention to detail is simply unmatched. My XEROXII chronograph has become an heirloom piece that I will pass down for generations.",
    name: "Alexandre Dubois",
    title: "Collector, Paris",
    src: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    quote:
      "An extraordinary fusion of modern design and classical watchmaking. The build quality and finish are beyond anything I have experienced.",
    name: "Victoria Sterling",
    title: "Editor, Robb Report",
    src: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    quote:
      "XEROXII represents the future of luxury horology. Their commitment to sustainable materials without compromising on elegance is truly inspiring.",
    name: "James Chen",
    title: "Horologist, London",
    src: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const PRESS = ["VOGUE", "ROBB REPORT", "GQ", "ESQUIRE", "MONOCLE"];

export default function TestimonialsCarousel() {
  return (
    <section id="testimonials" className="relative bg-[#f3f2ef] py-20 sm:py-28 lg:py-32">
      <div className="page-shell text-center mb-12 sm:mb-16">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
          Trusted Worldwide
        </p>
        <h2 className="section-heading mt-3 text-4xl font-semibold uppercase tracking-wide text-black sm:text-5xl">
          What Our Clients Say
        </h2>
      </div>

      <div className="page-shell">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".testimonials-pagination" }}
          loop
          className="testimonials-swiper"
        >
          {TESTIMONIALS.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center text-center px-4"
              >
                <div className="relative mb-6 h-20 w-20 overflow-hidden rounded-full border border-black/10 sm:h-24 sm:w-24">
                  <img
                    src={item.src}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="max-w-2xl text-lg italic leading-relaxed text-black/80 sm:text-xl lg:text-2xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-black sm:text-sm">
                  {item.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/50">
                  {item.title}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testimonials-pagination mt-8 flex items-center justify-center gap-2" />
      </div>

      <div className="page-shell mt-16 sm:mt-20">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {PRESS.map((name) => (
            <span
              key={name}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-black/30 sm:text-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
