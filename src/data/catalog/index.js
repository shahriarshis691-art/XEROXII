import { BRAND_PRODUCTS } from '../brandProducts';
import { FEATURED_PRODUCTS } from '../featuredProducts';
import { WATCH_LISTING_PRODUCTS } from '../watchListingProducts';
import { AUTOMATIC_WATCHES } from '../automaticWatches';
import { JEWELLERY_LISTING_PRODUCTS } from '../jewelleryProducts';
import { normalizeCatalogProduct } from './normalize';

const SOURCES = [
  ...BRAND_PRODUCTS.map((p) => normalizeCatalogProduct(p, { category: 'watches', type: 'watch', brand: p.brand, source: 'brand' })),
  ...FEATURED_PRODUCTS.map((p) => normalizeCatalogProduct(p, { category: 'watches', type: 'watch', brand: 'XEROXII Featured', source: 'featured' })),
  ...WATCH_LISTING_PRODUCTS.map((p) => normalizeCatalogProduct(p, { category: 'watches', type: 'watch', brand: 'XEROXII Collection', source: 'watch-listing' })),
  ...AUTOMATIC_WATCHES.map((p) => normalizeCatalogProduct(p, { category: 'watches', type: 'watch', brand: p.brand, source: 'automatic' })),
  ...JEWELLERY_LISTING_PRODUCTS.map((p) => normalizeCatalogProduct(p, { category: p.category.toLowerCase(), type: 'jewellery', source: 'jewellery-listing' })),
];

const CATALOG_MAP = new Map(SOURCES.map((p) => [p.id, p]));

export const CATALOG = SOURCES;

export function getProductById(id) {
  return CATALOG_MAP.get(id) || null;
}

export function getAllProducts() {
  return CATALOG;
}

export function getProductsByCategory(category) {
  const cat = category.toLowerCase();
  return CATALOG.filter((p) => p.category.includes(cat) || p.type === cat);
}

export function getProductsByBrand(brand) {
  return CATALOG.filter((p) => p.brand?.toLowerCase() === brand.toLowerCase());
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  return CATALOG.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand || p.type === product.type)
  ).slice(0, limit);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CATALOG.filter((p) => {
    const fields = [
      p.name,
      p.title,
      p.brand,
      p.category,
      p.collection,
      p.sku,
      p.description,
      p.tag,
      ...(p.tags || []),
    ];
    return fields
      .filter(Boolean)
      .some((field) => String(field).toLowerCase().includes(q));
  });
}
