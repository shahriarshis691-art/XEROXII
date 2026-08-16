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
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import StaticInfoPage from "./pages/StaticInfoPage";
import Footer from "./components/Footer";
import { getStaticPageSlugs } from "./data/staticPages";

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
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/womens-jewellery" element={<WomensJewelleryPage />} />
            <Route path="/womens-jewellery-listing" element={<WomensJewelleryListing />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/search" element={<SearchPage />} />
            {getStaticPageSlugs().map((slug) => (
              <Route key={slug} path={`/${slug}`} element={<StaticInfoPage slug={slug} />} />
            ))}
            <Route path="/account" element={<div className="page-shell py-20 text-center"><p className="text-black/60">Account page coming soon</p></div>} />
            <Route path="/wishlist" element={<div className="page-shell py-20 text-center"><p className="text-black/60">Wishlist page coming soon</p></div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;
