import Hero from "./Hero";
import BrandHeritageBanner from "./BrandHeritageBanner";
import CollectionShowcase from "./CollectionShowcase";
import WomensJewellery from "./WomensJewellery";
import WatchListing from "./WatchListing";
import FeaturedWatches from "./FeaturedWatches";
import PopularBrands from "./PopularBrands";
import Seo from "./Seo";
import { organizationSchema } from "../lib/schema";

export default function Home() {
  return (
    <>
      <Seo
        title={null}
        description="XEROXII — Curated luxury watches and fine jewellery. Shop authentic Seiko, Tissot, Hamilton, Citizen, Orient, and Casio timepieces."
        path="/"
        jsonLd={organizationSchema()}
      />
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
