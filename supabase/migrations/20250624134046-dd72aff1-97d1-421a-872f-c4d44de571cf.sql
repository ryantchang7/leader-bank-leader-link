
-- Fix RLS policies for investor_profiles table to allow admin inserts
-- Drop all existing policies first
DROP POLICY IF EXISTS "Admins can manage investor profiles" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can select investor profiles" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can insert investor profiles" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can update investor profiles" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can delete investor profiles" ON public.investor_profiles;

-- Create new policies with proper permissions
CREATE POLICY "Admins can select investor profiles" ON public.investor_profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert investor profiles" ON public.investor_profiles
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update investor profiles" ON public.investor_profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete investor profiles" ON public.investor_profiles
  FOR DELETE USING (public.is_admin(auth.uid()));
