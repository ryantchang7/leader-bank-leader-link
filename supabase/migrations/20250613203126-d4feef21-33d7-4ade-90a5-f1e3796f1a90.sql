
-- Fix admin access and RLS policies

-- First, let's add a default admin user (replace with your actual user ID)
-- You'll need to get your user ID from Supabase Auth > Users after signing up
-- For now, I'll create the structure and you can insert your user ID manually

-- Update RLS policies for admin access
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can insert admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can manage investor profiles" ON public.investor_profiles;
DROP POLICY IF EXISTS "Admins can view accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can update accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Anyone can submit accelerator applications" ON public.accelerator_applications;

-- Recreate policies with better logic
CREATE POLICY "Admins can view admin users" ON public.admin_users
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert admin users" ON public.admin_users
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

-- Allow anyone to insert submissions (for public form)
CREATE POLICY "Anyone can insert submissions" ON public.submissions
  FOR INSERT WITH CHECK (true);

-- Only admins can view and manage submissions
CREATE POLICY "Admins can view all submissions" ON public.submissions
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update submissions" ON public.submissions
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete submissions" ON public.submissions
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Investor profiles policies
CREATE POLICY "Admins can view investor profiles" ON public.investor_profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert investor profiles" ON public.investor_profiles
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update investor profiles" ON public.investor_profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete investor profiles" ON public.investor_profiles
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Accelerator applications policies
CREATE POLICY "Anyone can submit accelerator applications" ON public.accelerator_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view accelerator applications" ON public.accelerator_applications
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update accelerator applications" ON public.accelerator_applications
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete accelerator applications" ON public.accelerator_applications
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Create a function to easily add admin users
CREATE OR REPLACE FUNCTION public.add_admin_user(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_users (user_id, role)
  SELECT au.id, 'admin'
  FROM auth.users au
  WHERE au.email = user_email
  AND NOT EXISTS (
    SELECT 1 FROM public.admin_users admin_u 
    WHERE admin_u.user_id = au.id
  );
END;
$$;
