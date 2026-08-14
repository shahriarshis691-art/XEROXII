import Hero from "./components/Hero";
import CollectionShowcase from "./components/CollectionShowcase";
import WomensJewellery from "./components/WomensJewellery";
import WatchListing from "./components/WatchListing";
import FeaturedWatches from "./components/FeaturedWatches";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Hero />
      <CollectionShowcase />
      <WomensJewellery />
      <WatchListing />
      <FeaturedWatches />
      <Footer />
    </>
  );
}

export default App;