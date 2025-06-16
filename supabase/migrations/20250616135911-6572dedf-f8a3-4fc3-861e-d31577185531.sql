
-- Force a complete reset of RLS policies with more explicit approach

-- First, completely disable RLS on both tables
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.accelerator_applications DISABLE ROW LEVEL SECURITY;

-- Drop ALL policies that might exist (using broader patterns)
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all policies on submissions table
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'submissions' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON public.submissions';
    END LOOP;
    
    -- Drop all policies on accelerator_applications table
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'accelerator_applications' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON public.accelerator_applications';
    END LOOP;
END $$;

-- Re-enable RLS
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accelerator_applications ENABLE ROW LEVEL SECURITY;

-- Create brand new policies with unique names
CREATE POLICY "submissions_public_insert_policy" ON public.submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "submissions_admin_select_policy" ON public.submissions
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "submissions_admin_update_policy" ON public.submissions
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "submissions_admin_delete_policy" ON public.submissions
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Create policies for accelerator applications
CREATE POLICY "accelerator_public_insert_policy" ON public.accelerator_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "accelerator_admin_select_policy" ON public.accelerator_applications
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "accelerator_admin_update_policy" ON public.accelerator_applications
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "accelerator_admin_delete_policy" ON public.accelerator_applications
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Verify the policies are created correctly
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('submissions', 'accelerator_applications') 
AND schemaname = 'public';
