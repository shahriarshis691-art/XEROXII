import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandHeritageBanner from "./components/BrandHeritageBanner";
import CollectionShowcase from "./components/CollectionShowcase";
import WomensJewellery from "./components/WomensJewellery";
import WatchListing from "./components/WatchListing";
import FeaturedWatches from "./components/FeaturedWatches";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import PopularBrands from "./components/PopularBrands";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <BrandHeritageBanner />
      <CollectionShowcase />
      <WomensJewellery />
      <WatchListing />
      <FeaturedWatches />
      <TestimonialsCarousel />
      <PopularBrands />
      <Footer />
    </>
  );
}

export default App;