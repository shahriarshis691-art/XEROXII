import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BrandPage from "./components/BrandPage";
import WomensJewelleryPage from "./pages/WomensJewellery";
import WomensJewelleryListing from "./pages/WomensJewelleryListing";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import Footer from "./components/Footer";

function App() {
  return (
    <HelmetProvider>
      <Toaster position="top-right" />
      <AppProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand/:slug" element={<BrandPage />} />
            <Route path="/womens-jewellery" element={<WomensJewelleryPage />} />
            <Route path="/womens-jewellery-listing" element={<WomensJewelleryListing />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            {/* Placeholder routes - will be implemented */}
            <Route path="/account" element={<div className="page-shell py-20 text-center"><p className="text-black/60">Account page coming soon</p></div>} />
            <Route path="/wishlist" element={<div className="page-shell py-20 text-center"><p className="text-black/60">Wishlist page coming soon</p></div>} />
            <Route path="/contact" element={<div className="page-shell py-20 text-center"><p className="text-black/60">Contact page coming soon</p></div>} />
            <Route path="/boutique" element={<div className="page-shell py-20 text-center"><p className="text-black/60">Boutique page coming soon</p></div>} />
            <Route path="/search" element={<div className="page-shell py-20 text-center"><p className="text-black/60">Search page coming soon</p></div>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;
