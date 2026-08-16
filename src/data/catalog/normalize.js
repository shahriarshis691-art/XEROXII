import { parsePrice, formatPrice } from '../../lib/productUtils';

const WATCH_SPECS = [
  'Premium stainless steel case',
  'Sapphire crystal glass',
  'Water resistant to 100m',
  'Swiss-made automatic movement',
  '2-year international warranty',
];

const JEWELLERY_SPECS = [
  '18K gold or platinum setting',
  'Conflict-free certified stones',
  'Hand-finished by master artisans',
  'Includes authenticity certificate',
  'Complimentary lifetime cleaning',
];

export function normalizeCatalogProduct(raw, defaults = {}) {
  const id = raw.id;
  const name = raw.name || raw.title;
  const title = raw.title || raw.name;
  const priceRaw = raw.priceBDT || raw.price;
  const priceAmount = parsePrice({ price: priceRaw });
  const category = defaults.category || raw.category || 'watches';
  const type = defaults.type || (category.includes('necklace') || category.includes('ring') || category.includes('earring') || category.includes('bracelet') || category.includes('jewellery') ? 'jewellery' : 'watch');

  return {
    id,
    slug: id,
    name,
    title,
    brand: raw.brand || defaults.brand || (type === 'jewellery' ? 'XEROXII Jewellery' : 'XEROXII'),
    category: typeof category === 'string' ? category.toLowerCase() : 'watches',
    type,
    price: priceRaw || formatPrice(priceAmount),
    priceBDT: raw.priceBDT || priceRaw || formatPrice(priceAmount),
    priceAmount,
    currency: 'BDT',
    image: raw.image || raw.src,
    images: [raw.image || raw.src].filter(Boolean),
    src: raw.src || raw.image,
    tag: raw.tag || raw.badge || null,
    badge: raw.badge || raw.tag || null,
    sku: raw.sku || null,
    collection: raw.collection || null,
    description: raw.description || defaults.description || (type === 'jewellery'
      ? 'Expertly crafted luxury jewellery featuring finest materials and timeless design.'
      : 'Expertly crafted timepiece featuring precision movement, premium materials, and timeless design.'),
    specs: raw.specs || (type === 'jewellery' ? JEWELLERY_SPECS : WATCH_SPECS),
    stock: raw.stock ?? 99,
    source: defaults.source || 'catalog',
  };
}
