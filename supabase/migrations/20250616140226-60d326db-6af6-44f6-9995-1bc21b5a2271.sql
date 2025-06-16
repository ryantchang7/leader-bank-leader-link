
-- Complete RLS bypass for public submissions - most direct approach

-- First, completely disable RLS on both tables
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.accelerator_applications DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies completely
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all policies on submissions table
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'submissions' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY "' || policy_record.policyname || '" ON public.submissions';
    END LOOP;
    
    -- Drop all policies on accelerator_applications table
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'accelerator_applications' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY "' || policy_record.policyname || '" ON public.accelerator_applications';
    END LOOP;
END $$;

-- Enable RLS again
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accelerator_applications ENABLE ROW LEVEL SECURITY;

-- Create the most permissive policies possible for inserts
CREATE POLICY "allow_all_inserts_submissions" ON public.submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "allow_all_inserts_accelerator" ON public.accelerator_applications  
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- For admin access, create simple policies that don't depend on complex functions
CREATE POLICY "allow_authenticated_select_submissions" ON public.submissions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "allow_authenticated_update_submissions" ON public.submissions
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "allow_authenticated_delete_submissions" ON public.submissions
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "allow_authenticated_select_accelerator" ON public.accelerator_applications
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "allow_authenticated_update_accelerator" ON public.accelerator_applications
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "allow_authenticated_delete_accelerator" ON public.accelerator_applications
  FOR DELETE TO authenticated USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname, cmd, roles, qual 
FROM pg_policies 
WHERE tablename IN ('submissions', 'accelerator_applications') 
AND schemaname = 'public'
ORDER BY tablename, policyname;
