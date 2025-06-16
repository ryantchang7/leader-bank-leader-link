
-- Fix RLS policies to allow public submissions but admin-only viewing

-- Drop ALL existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.submissions;
DROP POLICY IF EXISTS "Public can insert submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can select submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.submissions;

DROP POLICY IF EXISTS "Anyone can submit accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Public can insert accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can view accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can select accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can update accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can delete accelerator applications" ON public.accelerator_applications;

-- Create new policies that allow public inserts
CREATE POLICY "Public can insert submissions" ON public.submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert accelerator applications" ON public.accelerator_applications
  FOR INSERT WITH CHECK (true);

-- Create admin policies for viewing/managing
CREATE POLICY "Admins can select submissions" ON public.submissions
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update submissions" ON public.submissions
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete submissions" ON public.submissions
  FOR DELETE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can select accelerator applications" ON public.accelerator_applications
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update accelerator applications" ON public.accelerator_applications
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete accelerator applications" ON public.accelerator_applications
  FOR DELETE USING (public.is_admin(auth.uid()));
