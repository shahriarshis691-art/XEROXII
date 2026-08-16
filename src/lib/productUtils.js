/**
 * Parse numeric price from a product or cart item.
 * Supports `price`, `priceBDT`, and numeric values.
 */
import { formatCurrency, convertFromBDT, formatAmountFromBDT } from './currency';
export function parsePrice(item) {
  const raw = item?.price ?? item?.priceBDT;
  if (raw == null) return 0;
  if (typeof raw === 'number') return raw;
  const parsed = parseInt(String(raw).replace(/[^\d]/g, ''), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/** Format a numeric BDT amount using the shopper's selected currency. */
export function formatPrice(amount, currencyCode = 'BDT') {
  return formatAmountFromBDT(amount, currencyCode);
}

/** Get display name from product fields. */
export function getProductName(product) {
  return product?.name || product?.title || 'Product';
}

/** Get formatted price string for display in the active currency. */
export function getProductPriceDisplay(product, currencyCode = 'BDT') {
  return formatPrice(parsePrice(product), currencyCode);
}

/**
 * Normalize product shape before adding to cart or wishlist.
 * Ensures consistent id, name, title, price, and image fields.
 */
export function normalizeProduct(product) {
  const slug = (product.name || product.title || 'item')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const priceValue = product.price || product.priceBDT;

  return {
    ...product,
    id: product.id || `product-${slug}`,
    name: product.name || product.title,
    title: product.title || product.name,
    price: priceValue,
    priceBDT: product.priceBDT || product.price,
    image: product.image || product.src,
    src: product.src || product.image,
  };
}

/** Generate a downloadable invoice text for an order. */
export function generateInvoiceText(order) {
  const currencyCode = order.currency ?? 'BDT';
  const fmt = (amount) => formatCurrency(amount, currencyCode);
  const fmtItem = (item) => {
    const bdt = parsePrice(item) * item.quantity;
    return fmt(order.currency && order.currency !== 'BDT' ? convertFromBDT(bdt, currencyCode) : bdt);
  };

  const lines = [
    'XEROXII — ORDER INVOICE',
    '========================',
    `Order ID: ${order.id}`,
    `Date: ${new Date(order.createdAt).toLocaleString()}`,
    `Status: ${order.status}`,
    `Currency: ${currencyCode}`,
    '',
    'ITEMS',
    '-----',
    ...order.items.map((item) => `${getProductName(item)} x${item.quantity} — ${fmtItem(item)}`),
    '',
    `Subtotal: ${fmt(order.subtotal)}`,
    `Shipping: Free`,
    `Tax (10%): ${fmt(order.tax)}`,
    `Total: ${fmt(order.total)}`,
    '',
    'SHIPPING ADDRESS',
    '----------------',
    `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
    order.shippingInfo.address,
    `${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.zipCode}`,
    order.shippingInfo.country,
    `Email: ${order.shippingInfo.email}`,
    `Phone: ${order.shippingInfo.phone}`,
    '',
    'PAYMENT',
    '-------',
    order.paymentInfo.method === 'card'
      ? `Card ending in ${order.paymentInfo.last4}`
      : order.paymentInfo.method === 'cod'
        ? 'Cash on Delivery'
        : order.paymentInfo.method === 'paypal'
          ? 'PayPal'
          : 'Bank Transfer',
  ];
  return lines.join('\n');
}
