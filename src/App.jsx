import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BrandPage from "./components/BrandPage";
import WomensJewelleryPage from "./pages/WomensJewellery";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand/:slug" element={<BrandPage />} />
        <Route path="/womens-jewellery" element={<WomensJewelleryPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
