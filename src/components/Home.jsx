import Hero from "./Hero";
import BrandHeritageBanner from "./BrandHeritageBanner";
import CollectionShowcase from "./CollectionShowcase";
import WomensJewellery from "./WomensJewellery";
import WatchListing from "./WatchListing";
import FeaturedWatches from "./FeaturedWatches";
import PopularBrands from "./PopularBrands";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandHeritageBanner />
      <CollectionShowcase />
      <WomensJewellery />
      <WatchListing />
      <FeaturedWatches />
      <PopularBrands />
    </>
  );
}
