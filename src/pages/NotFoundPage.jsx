import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] flex items-center justify-center py-16">
      <Helmet>
        <title>Page Not Found | XEROXII</title>
      </Helmet>
      <div className="page-shell text-center">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50 mb-4">
          404
        </p>
        <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-wide text-black mb-4">
          Page Not Found
        </h1>
        <p className="text-black/60 mb-8 max-w-md mx-auto">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition"
          >
            Return Home
          </Link>
          <Link
            to="/search"
            className="inline-block px-8 py-3 border border-black/20 text-black text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/5 transition"
          >
            Search Products
          </Link>
        </div>
      </div>
    </main>
  );
}
