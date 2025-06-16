
-- Completely reset RLS policies for submissions and accelerator_applications tables

-- First, disable RLS temporarily to clear all policies
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.accelerator_applications DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies with more comprehensive names
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.submissions;
DROP POLICY IF EXISTS "Public can insert submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can select submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can manage submissions" ON public.submissions;

DROP POLICY IF EXISTS "Anyone can submit accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Public can insert accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can view accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can select accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can update accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can delete accelerator applications" ON public.accelerator_applications;
DROP POLICY IF EXISTS "Admins can manage accelerator applications" ON public.accelerator_applications;

-- Re-enable RLS
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accelerator_applications ENABLE ROW LEVEL SECURITY;

-- Create simple, clear policies for submissions
CREATE POLICY "Allow public submissions insert" ON public.submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin submissions select" ON public.submissions
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Allow admin submissions update" ON public.submissions
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Allow admin submissions delete" ON public.submissions
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Create simple, clear policies for accelerator applications
CREATE POLICY "Allow public accelerator insert" ON public.accelerator_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin accelerator select" ON public.accelerator_applications
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Allow admin accelerator update" ON public.accelerator_applications
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Allow admin accelerator delete" ON public.accelerator_applications
  FOR DELETE USING (public.is_admin(auth.uid()));
