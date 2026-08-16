import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getStaticPage } from '../data/staticPages';

export default function StaticInfoPage({ slug }) {
  const page = getStaticPage(slug);

  if (!page) {
    return (
      <main className="min-h-screen bg-[#fafaf8] py-16">
        <div className="page-shell text-center">
          <h1 className="text-3xl font-light text-black mb-4">Page Not Found</h1>
          <Link to="/" className="inline-block px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition">
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf8] py-12 sm:py-20">
      <Seo title={page.title} description={page.subtitle} path={`/${slug}`} />
      <div className="page-shell max-w-3xl">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
          {page.subtitle}
        </p>
        <h1 className="mt-3 break-words text-3xl font-light uppercase tracking-wide text-black sm:text-5xl">
          {page.title}
        </h1>
        <div className="mt-10 space-y-6 border-t border-black/10 pt-10">
          {page.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-black/70">
              {paragraph}
            </p>
          ))}
          {page.links?.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="inline-block border-b border-black/40 pb-0.5 text-sm text-black/70 transition hover:border-black hover:text-black mr-6"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
