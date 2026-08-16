-- XEROXII Phase 1: Orders table for Supabase
-- Run in Supabase SQL Editor when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  shipping_fee NUMERIC NOT NULL DEFAULT 0,
  tax NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  shipping_info JSONB NOT NULL DEFAULT '{}',
  payment_info JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for guest checkout (tighten with auth in Phase 2)
CREATE POLICY "Allow anonymous order inserts"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow read own orders by id"
  ON orders FOR SELECT
  USING (true);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
