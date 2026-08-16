import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { FiCheckCircle, FiDownload } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';
import { parsePrice, getProductName, generateInvoiceText } from '../lib/productUtils';
import { formatCurrency, convertFromBDT } from '../lib/currency';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { getOrderById } = useContext(AppContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = () => {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId, getOrderById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="text-black/60">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#fafaf8] py-16">
        <div className="page-shell text-center">
          <h1 className="text-4xl font-light text-black mb-4">Order Not Found</h1>
          <p className="text-black/60 mb-8">The order you're looking for could not be found.</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition"
          >
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  const currencyCode = order.currency ?? 'BDT';
  const fmt = (amount) => formatCurrency(amount, currencyCode);
  const fmtItemTotal = (item) => {
    const bdt = parsePrice(item) * item.quantity;
    const amount = order.currency && order.currency !== 'BDT'
      ? convertFromBDT(bdt, currencyCode)
      : bdt;
    return fmt(amount);
  };

  const handleDownloadInvoice = () => {
    const text = generateInvoiceText(order);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `xeroxii-invoice-${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] py-8 sm:py-16">
      <Seo title="Order Confirmed" description="Your XEROXII order has been placed successfully." path={`/order-confirmation/${orderId}`} noindex />
      <div className="page-shell">
        {/* Success Message */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FiCheckCircle size={60} className="text-green-600" />
            </motion.div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-wide text-black mb-4">
            Order Confirmed
          </h1>
          <p className="text-lg text-black/70 mb-2">Thank you for your purchase!</p>
          <p className="text-sm uppercase tracking-[0.16em] text-black/60">
            A confirmation email has been sent to <span className="font-semibold">{order.shippingInfo.email}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">
          {/* Order Details */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Order ID & Date */}
            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-2">
                    Order ID
                  </p>
                  <p className="font-semibold text-lg text-black">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-2">
                    Order Date
                  </p>
                  <p className="font-semibold text-lg text-black">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-black/10">
                <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-2">
                  Order Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                  <p className="font-semibold text-black capitalize">{order.status}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-6">
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-black/10 last:border-b-0 last:pb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-16 h-20 bg-[#e9e7e1]">
                      <img
                        src={item.src || item.image}
                        alt={getProductName(item)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black text-sm sm:text-base mb-1">
                        {getProductName(item)}
                      </h3>
                      <p className="text-xs sm:text-sm text-black/60 mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-black">
                        {fmtItemTotal(item)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-6">
                Shipping Address
              </h2>
              <div className="space-y-2 text-sm text-black/70">
                <p className="font-semibold text-black">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </p>
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                </p>
                <p>{order.shippingInfo.country}</p>
                <div className="pt-2 border-t border-black/10 mt-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-1">
                    Contact
                  </p>
                  <p className="font-medium text-black">{order.shippingInfo.email}</p>
                  <p className="font-medium text-black">{order.shippingInfo.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            className="lg:col-span-1 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border border-black/10 bg-white p-6 sm:p-8 sticky top-24">
              <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-6">
                Order Summary
              </h2>
              {order.currency && (
                <p className="text-xs uppercase tracking-[0.14em] text-black/50 mb-4">
                  Charged in {order.currency}
                </p>
              )}

              <div className="space-y-3 mb-6 pb-6 border-b border-black/10">
                <div className="flex justify-between text-sm text-black/70">
                  <span>Subtotal</span>
                  <span>{fmt(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-black/70">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm text-black/70">
                  <span>Tax (10%)</span>
                  <span>{fmt(order.tax)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8 pb-8 border-b border-black/10">
                <span className="font-semibold uppercase tracking-wide text-black">Total</span>
                <span className="font-semibold text-lg text-black">
                  {fmt(order.total)}
                </span>
              </div>

              {/* Payment Info */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-3">
                  Payment Method
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                  <p className="text-sm font-medium text-black">
                    {order.paymentInfo.method === 'card' && `Card ending in ${order.paymentInfo.last4}`}
                    {order.paymentInfo.method === 'cod' && 'Cash on Delivery'}
                    {order.paymentInfo.method === 'paypal' && 'PayPal'}
                    {order.paymentInfo.method === 'bank' && 'Bank Transfer'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleDownloadInvoice}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-black/20 text-black text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/5 transition"
                >
                  <FiDownload size={16} />
                  Download Invoice
                </button>
                <Link
                  to="/"
                  className="block w-full py-3 px-4 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] text-center hover:bg-black/90 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          className="bg-white border border-black/10 p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-6">
            What Happens Next?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                number: '1',
                title: 'Order Confirmation',
                description: 'You will receive an order confirmation email shortly.',
              },
              {
                number: '2',
                title: 'Processing',
                description: 'Your order is being prepared for shipment (2-3 business days).',
              },
              {
                number: '3',
                title: 'Shipment',
                description: 'Track your package with the tracking number sent via email.',
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-4 sm:left-0 top-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
                  {step.number}
                </div>
                <div className="ml-6 sm:ml-0 pt-2">
                  <h3 className="font-semibold text-black text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-black/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
