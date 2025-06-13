
-- Fix 1: Update the is_admin function to include search_path parameter for security
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = is_admin.user_id
  );
$$;

-- Fix 2: Note about password encryption
-- The password_encryption setting needs to be configured at the server level
-- This is typically already set to 'scram-sha-256' in modern Supabase instances
-- You can verify this by running: SHOW password_encryption;
