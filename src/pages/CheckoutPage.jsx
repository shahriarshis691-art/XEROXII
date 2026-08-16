import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { AppContext } from '../context/AppContext';
import { parsePrice, getProductName } from '../lib/productUtils';
import { formatCurrency, convertFromBDT, computeOrderTotals } from '../lib/currency';
import toast from 'react-hot-toast';
import { COUNTRIES, getSubdivisions, getStateLabel, getCountryName } from '../data/regions';

const inputClass = (hasError) =>
  `w-full px-4 py-3 border text-black bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
    hasError ? 'border-red-500' : 'border-black/20'
  }`;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, placeOrder, profile } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'BD',
    paymentMethod: 'cod',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) {
    return null;
  }

  const validateForm = () => {
    const newErrors = {};

    // Shipping validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State/Province is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP/Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    // Payment validation (card only — COD/PayPal/bank skip card fields)
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, '')))
        newErrors.cardNumber = 'Card number must be 16 digits';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry))
        newErrors.cardExpiry = 'Format must be MM/YY';
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required';
      else if (!/^\d{3,4}$/.test(formData.cardCvc))
        newErrors.cardCvc = 'CVC must be 3-4 digits';
    }

    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setFormData(prev => ({
      ...prev,
      country: countryCode,
      state: '',
    }));
    if (errors.country) setErrors(prev => ({ ...prev, country: '' }));
    if (errors.state) setErrors(prev => ({ ...prev, state: '' }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (!/^\d*$/.test(value)) value = value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setFormData(prev => ({ ...prev, cardExpiry: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors below');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const selectedCountry = COUNTRIES.find((c) => c.code === formData.country);
      const currencyCode = selectedCountry?.currency ?? 'BDT';
      const totals = computeOrderTotals(cartTotal, currencyCode);

      const order = await placeOrder(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: getCountryName(formData.country),
          countryCode: formData.country,
        },
        {
          method: formData.paymentMethod,
          cardLast4: formData.paymentMethod === 'card'
            ? formData.cardNumber.replace(/\s/g, '').slice(-4)
            : null,
        },
        totals
      );

      if (order) {
        setFormData((prev) => ({
          ...prev,
          cardNumber: '',
          cardName: '',
          cardExpiry: '',
          cardCvc: '',
        }));
        toast.success('Order placed successfully!');
        navigate(`/order-confirmation/${order.id}`);
      }
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCountry = COUNTRIES.find((c) => c.code === formData.country);
  const currencyCode = selectedCountry?.currency ?? 'BDT';
  const { subtotal, tax, total } = computeOrderTotals(cartTotal, currencyCode);
  const subdivisions = getSubdivisions(formData.country);
  const stateLabel = getStateLabel(formData.country);

  const formatLinePrice = (amountBDT) => formatCurrency(convertFromBDT(amountBDT, currencyCode), currencyCode);

  return (
    <main className="min-h-screen bg-[#fafaf8] py-8 sm:py-16">
      <Seo title="Checkout" description="Complete your XEROXII order securely." path="/checkout" noindex />
      <div className="page-shell">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-wide text-black mb-2">
            Checkout
          </h1>
          <p className="text-sm uppercase tracking-[0.16em] text-black/60">
            Complete your order securely
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <form id="checkout-form" onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <motion.div
              className="border border-black/10 bg-white p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-6">
                Shipping Address
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                      errors.firstName ? 'border-red-500' : 'border-black/20'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                      errors.lastName ? 'border-red-500' : 'border-black/20'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                      errors.email ? 'border-red-500' : 'border-black/20'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                      errors.phone ? 'border-red-500' : 'border-black/20'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                    errors.address ? 'border-red-500' : 'border-black/20'
                  }`}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className={inputClass(errors.country)}
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                    {stateLabel}
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={!formData.country}
                    className={`${inputClass(errors.state)} disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/40`}
                  >
                    <option value="">
                      {formData.country ? `Select ${stateLabel.toLowerCase()}` : 'Select country first'}
                    </option>
                    {subdivisions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                      errors.city ? 'border-red-500' : 'border-black/20'
                    }`}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                      errors.zipCode ? 'border-red-500' : 'border-black/20'
                    }`}
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              className="border border-black/10 bg-white p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-6">
                Payment Method
              </h2>

              <div className="space-y-3 mb-6">
                {['card', 'cod', 'paypal', 'bank'].map(method => (
                  <label key={method} className="flex items-center cursor-pointer hover:bg-black/5 p-3 rounded transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleInputChange}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium uppercase tracking-[0.16em] text-black">
                      {method === 'card' && 'Credit / Debit Card'}
                      {method === 'cod' && 'Cash on Delivery'}
                      {method === 'paypal' && 'PayPal'}
                      {method === 'bank' && 'Bank Transfer'}
                    </span>
                  </label>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                        errors.cardNumber ? 'border-red-500' : 'border-black/20'
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                        errors.cardName ? 'border-red-500' : 'border-black/20'
                      }`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleCardExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                          errors.cardExpiry ? 'border-red-500' : 'border-black/20'
                        }`}
                      />
                      {errors.cardExpiry && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium uppercase tracking-[0.16em] text-black/70 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length > 4) value = value.slice(0, 4);
                          setFormData(prev => ({ ...prev, cardCvc: value }));
                        }}
                        placeholder="123"
                        maxLength="4"
                        className={`w-full px-4 py-3 border text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-1 focus:ring-black/50 ${
                          errors.cardCvc ? 'border-red-500' : 'border-black/20'
                        }`}
                      />
                      {errors.cardCvc && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'cod' && (
                <p className="text-sm text-black/60 p-4 bg-black/5 rounded">
                  Pay with cash when your order is delivered. No online payment required.
                </p>
              )}

              {formData.paymentMethod === 'paypal' && (
                <p className="text-sm text-black/60 p-4 bg-black/5 rounded">
                  You will be redirected to PayPal to complete your payment securely.
                </p>
              )}

              {formData.paymentMethod === 'bank' && (
                <p className="text-sm text-black/60 p-4 bg-black/5 rounded">
                  Bank transfer details will be provided after order confirmation.
                </p>
              )}
            </motion.div>

            {/* Terms & Conditions */}
            <motion.div
              className="border border-black/10 bg-white p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <label className="flex items-start cursor-pointer gap-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 cursor-pointer"
                />
                <span className="text-sm text-black/70">
                  I agree to the{' '}
                  <span className="font-medium text-black">Terms & Conditions</span> and{' '}
                  <span className="font-medium text-black">Privacy Policy</span>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-xs mt-2">{errors.agreeTerms}</p>
              )}
            </motion.div>
          </form>

          {/* Order Summary Sidebar */}
          <motion.div
            className="lg:col-span-1 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border border-black/10 bg-white p-6 sm:p-8 sticky top-24">
              <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-6">
                Order Summary
              </h2>
              {selectedCountry && (
                <p className="text-xs uppercase tracking-[0.14em] text-black/50 mb-4">
                  Prices in {currencyCode} · {selectedCountry.name}
                </p>
              )}

              <div className="space-y-3 mb-6 pb-6 border-b border-black/10">
                {cart.map(item => (
                  <div key={item.cartLineId || item.id} className="flex justify-between text-sm text-black/70">
                    <span className="truncate mr-2">
                      {getProductName(item)} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatLinePrice(parsePrice(item) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-black/10">
                <div className="flex justify-between text-sm text-black/70">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal, currencyCode)}</span>
                </div>
                <div className="flex justify-between text-sm text-black/70">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm text-black/70">
                  <span>Tax (10%)</span>
                  <span>{formatCurrency(tax, currencyCode)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <span className="font-semibold uppercase tracking-wide text-black">Total</span>
                <span className="font-semibold text-lg text-black">
                  {formatCurrency(total, currencyCode)}
                </span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 disabled:bg-black/50 disabled:cursor-not-allowed transition"
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
