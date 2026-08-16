import supabase from './supabase';

function isSupabaseConfigured() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes('your-project') && !key.includes('your-anon'));
}

export function isAuthEnabled() {
  return isSupabaseConfigured();
}

export async function signInWithEmail(email, password) {
  if (!isSupabaseConfigured()) {
    return { user: null, error: 'Authentication is not configured. Using guest mode.' };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data.user, error: error?.message || null };
}

export async function signUpWithEmail(email, password, metadata = {}) {
  if (!isSupabaseConfigured()) {
    return { user: null, error: 'Authentication is not configured. Using guest mode.' };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });
  return { user: data.user, error: error?.message || null };
}

export async function signOut() {
  if (!isSupabaseConfigured()) return { error: null };
  const { error } = await supabase.auth.signOut();
  return { error: error?.message || null };
}

export async function getSession() {
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(callback) {
  if (!isSupabaseConfigured()) return { data: { subscription: { unsubscribe: () => {} } } };
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}
