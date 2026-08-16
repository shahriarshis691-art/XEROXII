import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { getProductName } from '../lib/productUtils';
import { formatOrderMoney } from '../lib/currency';
import { isAuthEnabled, signInWithEmail, signUpWithEmail, signOut } from '../lib/authService';

export default function AccountPage() {
  const { user, setUser, profile, updateProfile, getOrderHistory } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('orders');
  const [authMode, setAuthMode] = useState('signin');
  const [authForm, setAuthForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [profileForm, setProfileForm] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const orders = getOrderHistory();
  const authEnabled = isAuthEnabled();

  useEffect(() => {
    setProfileForm({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
    });
  }, [profile]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    toast.success('Profile saved');
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (authMode === 'signin') {
        const { user: authUser, error } = await signInWithEmail(authForm.email, authForm.password);
        if (error) toast.error(error);
        else {
          setUser(authUser);
          toast.success('Signed in successfully');
        }
      } else {
        const { user: authUser, error } = await signUpWithEmail(authForm.email, authForm.password, {
          firstName: authForm.firstName,
          lastName: authForm.lastName,
        });
        if (error) toast.error(error);
        else {
          setUser(authUser);
          toast.success('Account created');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    toast.success('Signed out');
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] py-8 sm:py-16">
      <Seo title="My Account" description="View your order history and manage your XEROXII profile." path="/account" noindex />
      <div className="page-shell">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-wide text-black mb-2">
            My Account
          </h1>
          <p className="text-sm uppercase tracking-[0.16em] text-black/60">
            {user ? `Signed in as ${user.email}` : 'Guest account — orders saved on this device'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {[
              { id: 'orders', label: 'Order History' },
              { id: 'profile', label: 'Profile' },
              ...(authEnabled ? [{ id: 'auth', label: user ? 'Sign Out' : 'Sign In' }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === 'auth' && user) handleSignOut();
                  else setActiveTab(tab.id);
                }}
                className={`whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] transition ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'border border-black/20 text-black hover:bg-black/5'
                }`}
              >
                {tab.id === 'auth' && user ? 'Sign Out' : tab.label}
              </button>
            ))}
          </nav>

          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {orders.length === 0 ? (
                  <div className="border border-black/10 bg-white p-10 text-center">
                    <p className="text-black/60 mb-6">No orders yet</p>
                    <Link to="/" className="inline-block px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border border-black/10 bg-white p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-black/50">Order ID</p>
                          <p className="font-semibold text-black">{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.16em] text-black/50">Date</p>
                          <p className="text-sm text-black">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10">
                        <div>
                          <p className="text-sm text-black/70">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {formatOrderMoney(order.total, order)}
                          </p>
                          <span className="inline-flex items-center gap-1.5 mt-1 text-xs uppercase tracking-wide text-black">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                            {order.status}
                          </span>
                        </div>
                        <Link
                          to={`/order-confirmation/${order.id}`}
                          className="px-5 py-2 border border-black/20 text-xs font-medium uppercase tracking-[0.16em] text-black hover:bg-black/5 transition"
                        >
                          View Details
                        </Link>
                      </div>
                      <ul className="mt-4 space-y-1 text-sm text-black/60">
                        {order.items.slice(0, 3).map((item) => (
                          <li key={item.cartLineId || item.id}>
                            {getProductName(item)} × {item.quantity}
                          </li>
                        ))}
                        {order.items.length > 3 && (
                          <li>+ {order.items.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleProfileSave}
                className="border border-black/10 bg-white p-6 sm:p-8 space-y-4"
              >
                <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-2">Profile Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-black/60 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-black/20 bg-white focus:outline-none focus:ring-1 focus:ring-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-black/60 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-black/20 bg-white focus:outline-none focus:ring-1 focus:ring-black/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-black/60 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-black/20 bg-white focus:outline-none focus:ring-1 focus:ring-black/50"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-black/60 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-black/20 bg-white focus:outline-none focus:ring-1 focus:ring-black/50"
                  />
                </div>
                <button type="submit" className="px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition">
                  Save Profile
                </button>
              </motion.form>
            )}

            {activeTab === 'auth' && authEnabled && !user && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border border-black/10 bg-white p-6 sm:p-8">
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className={`text-xs font-medium uppercase tracking-[0.16em] pb-1 border-b-2 ${authMode === 'signin' ? 'border-black text-black' : 'border-transparent text-black/50'}`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`text-xs font-medium uppercase tracking-[0.16em] pb-1 border-b-2 ${authMode === 'signup' ? 'border-black text-black' : 'border-transparent text-black/50'}`}
                  >
                    Create Account
                  </button>
                </div>
                <form onSubmit={handleAuth} className="space-y-4">
                  {authMode === 'signup' && (
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First name"
                        value={authForm.firstName}
                        onChange={(e) => setAuthForm({ ...authForm, firstName: e.target.value })}
                        className="px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black/50"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={authForm.lastName}
                        onChange={(e) => setAuthForm({ ...authForm, lastName: e.target.value })}
                        className="px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black/50"
                        required
                      />
                    </div>
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black/50"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black/50"
                    required
                    minLength={6}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 disabled:opacity-50 transition"
                  >
                    {isSubmitting ? 'Please wait...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
