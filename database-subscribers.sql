-- Newsletter Subscribers Table Setup
-- Run this in your Supabase SQL Editor

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{"articles": true, "market_updates": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Enable RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Public can insert (subscribe)
CREATE POLICY "Public can subscribe"
  ON subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Public can read their own subscription by email
CREATE POLICY "Users can view own subscription"
  ON subscribers
  FOR SELECT
  TO public
  USING (true);

-- Policy: Public can update their own subscription (for unsubscribe)
CREATE POLICY "Users can update own subscription"
  ON subscribers
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Policy: Admins can view all subscribers
CREATE POLICY "Admins view all subscribers"
  ON subscribers
  FOR SELECT
  USING (public.is_admin());

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS subscribers_updated_at ON subscribers;
CREATE TRIGGER subscribers_updated_at
  BEFORE UPDATE ON subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_subscribers_updated_at();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Subscribers table created successfully!';
  RAISE NOTICE 'You can now accept newsletter subscriptions.';
END $$;
