import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const BASE = 'https://www.xeroxii.com';

const { BRAND_PRODUCTS, BRAND_META } = await import('../src/data/brandProducts.js');
const { FEATURED_PRODUCTS } = await import('../src/data/featuredProducts.js');
const { WATCH_LISTING_PRODUCTS } = await import('../src/data/watchListingProducts.js');
const { AUTOMATIC_WATCHES } = await import('../src/data/automaticWatches.js');
const { JEWELLERY_LISTING_PRODUCTS } = await import('../src/data/jewelleryProducts.js');
const { getStaticPageSlugs } = await import('../src/data/staticPages.js');
const { getAllSisterBrandSlugs } = await import('../src/data/brandsData.js');

const productIds = new Set(
  [...BRAND_PRODUCTS, ...FEATURED_PRODUCTS, ...WATCH_LISTING_PRODUCTS, ...AUTOMATIC_WATCHES, ...JEWELLERY_LISTING_PRODUCTS]
    .map((p) => p.id)
    .filter(Boolean)
);

const routes = new Set([
  '',
  '/search',
  '/womens-jewellery',
  '/womens-jewellery-listing',
  '/wishlist',
  ...getAllSisterBrandSlugs().map((s) => `/brands/${s}`),
  ...getStaticPageSlugs().map((s) => `/${s}`),
  ...Object.values(BRAND_META).map((m) => `/brand/${m.slug}`),
  ...[...productIds].map((id) => `/product/${id}`),
]);

const urls = [...routes].sort().map((path) => {
  const loc = path === '' ? BASE : `${BASE}${path}`;
  const priority = path === '' ? '1.0' : path.startsWith('/product/') ? '0.8' : '0.6';
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public', 'sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${routes.size} URLs`);
