-- Fix infinite recursion in user_profiles RLS policies
-- Run this in Supabase SQL Editor

-- First, drop the problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON user_profiles;

-- Create a security definer function to check if user is admin
-- This bypasses RLS to prevent infinite recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the admin policies using the security definer function
CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update profiles"
  ON user_profiles
  FOR UPDATE
  USING (public.is_admin());

-- Verify policies were created
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename = 'user_profiles';
