import { SITE_URL } from './constants';
import { parsePrice, getProductName } from './productUtils';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'XEROXII',
    url: SITE_URL,
    logo: `${SITE_URL}/icons.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@xeroxii.com',
      contactType: 'customer service',
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

export function productSchema(product) {
  const price = parsePrice(product);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: getProductName(product),
    description: product.description,
    image: product.image || product.src,
    sku: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.id}`,
      priceCurrency: 'BDT',
      price: price,
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'XEROXII',
      },
    },
  };
}
