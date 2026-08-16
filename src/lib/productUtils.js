/**
 * Parse numeric price from a product or cart item.
 * Supports `price`, `priceBDT`, and numeric values.
 */
export function parsePrice(item) {
  const raw = item?.price ?? item?.priceBDT;
  if (raw == null) return 0;
  if (typeof raw === 'number') return raw;
  const parsed = parseInt(String(raw).replace(/[^\d]/g, ''), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/** Format a numeric amount as BDT display string. */
export function formatPrice(amount) {
  return `৳ ${amount.toLocaleString()}`;
}

/** Get display name from product fields. */
export function getProductName(product) {
  return product?.name || product?.title || 'Product';
}

/** Get formatted price string for display. */
export function getProductPriceDisplay(product) {
  return product?.price || product?.priceBDT || formatPrice(parsePrice(product));
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
  const lines = [
    'XEROXII — ORDER INVOICE',
    '========================',
    `Order ID: ${order.id}`,
    `Date: ${new Date(order.createdAt).toLocaleString()}`,
    `Status: ${order.status}`,
    '',
    'ITEMS',
    '-----',
    ...order.items.map((item) => {
      const unitPrice = parsePrice(item);
      return `${getProductName(item)} x${item.quantity} — ${formatPrice(unitPrice * item.quantity)}`;
    }),
    '',
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Shipping: Free`,
    `Tax (10%): ${formatPrice(order.tax)}`,
    `Total: ${formatPrice(order.total)}`,
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
