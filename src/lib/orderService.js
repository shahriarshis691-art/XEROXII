import supabase from './supabase';

function isSupabaseConfigured() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    !url.includes('your-project') &&
    !key.includes('your-anon')
  );
}

export async function persistOrder(order) {
  if (!isSupabaseConfigured()) {
    return { persisted: false, source: 'local' };
  }

  try {
    const { error } = await supabase.from('orders').insert({
      id: order.id,
      items: order.items,
      subtotal: order.subtotal,
      shipping_fee: order.shippingFee,
      tax: order.tax,
      total: order.total,
      shipping_info: order.shippingInfo,
      payment_info: order.paymentInfo,
      status: order.status,
      created_at: order.createdAt,
    });

    if (error) {
      console.warn('[orderService] Supabase persist failed:', error.message);
      return { persisted: false, source: 'local', error: error.message };
    }

    return { persisted: true, source: 'supabase' };
  } catch (err) {
    console.warn('[orderService] Supabase unavailable:', err);
    return { persisted: false, source: 'local', error: err.message };
  }
}

export function isBackendEnabled() {
  return isSupabaseConfigured();
}
