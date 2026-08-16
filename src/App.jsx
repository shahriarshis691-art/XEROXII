import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import FounderMessage from "./components/FounderMessage";
import WelcomeLocationModal from "./components/WelcomeLocationModal";
import { getStaticPageSlugs } from "./data/staticPages";

const BrandDetailPage = lazy(() => import("./pages/BrandDetailPage"));
const BrandPage = lazy(() => import("./components/BrandPage"));
const WomensJewelleryListing = lazy(() => import("./pages/WomensJewelleryListing"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderConfirmationPage = lazy(() => import("./pages/OrderConfirmationPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const StaticInfoPage = lazy(() => import("./pages/StaticInfoPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));

function App() {
  return (
    <HelmetProvider>
      <Toaster position="top-right" />
      <AppProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Navbar />
            <WelcomeLocationModal />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/brands/:slug" element={<BrandDetailPage />} />
                <Route path="/brand/:slug" element={<BrandPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/womens-jewellery" element={<Navigate to="/womens-jewellery-listing" replace />} />
                <Route path="/womens-jewellery-listing" element={<WomensJewelleryListing />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/account" element={<AccountPage />} />
                {getStaticPageSlugs().map((slug) => (
                  <Route key={slug} path={`/${slug}`} element={<StaticInfoPage slug={slug} />} />
                ))}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <FounderMessage />
            <Footer />
          </ErrorBoundary>
        </BrowserRouter>
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;
