import { useEffect, useState } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
import JewelleryPage from "./pages/JewelleryPage";
import JewelleryProductPage from "./pages/JewelleryProductPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import GiftsPage from "./pages/GiftsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Navbar";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, smoothTouch: false });
    let frame = 0;

    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/jewellery" element={<JewelleryPage />} />
        <Route path="/jewellery/:id" element={<JewelleryProductPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/gifts" element={<GiftsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </BrowserRouter>
  );
}

export default App;