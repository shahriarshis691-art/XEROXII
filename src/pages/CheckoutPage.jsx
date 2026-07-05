import CheckoutForm from "../components/CheckoutForm";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  );
}
