
-- Create admin users table for role-based access
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create submissions table for startup applications
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  company_hq TEXT NOT NULL,
  business_stage TEXT NOT NULL,
  industry TEXT NOT NULL,
  vertical TEXT,
  seeking_type TEXT NOT NULL,
  raise_amount TEXT,
  business_description TEXT,
  funding_purpose TEXT,
  current_revenue TEXT,
  growth_metrics JSONB,
  team_size INTEGER,
  previous_funding TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'distributed', 'matched')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  investor_matches INTEGER DEFAULT 0,
  notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  distributed_at TIMESTAMP WITH TIME ZONE
);

-- Create investor profiles table
CREATE TABLE public.investor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  firm TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  focus_areas TEXT[] NOT NULL DEFAULT '{}',
  investment_range TEXT NOT NULL,
  preferred_stages TEXT[] NOT NULL DEFAULT '{}',
  location TEXT,
  bio TEXT,
  linkedin_url TEXT,
  website TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  added_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create accelerator applications table
CREATE TABLE public.accelerator_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_name TEXT NOT NULL,
  founder_name TEXT NOT NULL,
  founder_email TEXT NOT NULL,
  founder_phone TEXT,
  company_stage TEXT NOT NULL,
  industry TEXT NOT NULL,
  accelerator_id TEXT NOT NULL, -- References the accelerator from the static data
  application_data JSONB NOT NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'accepted', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accelerator_applications ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = is_admin.user_id
  );
$$;

-- Admin users policies
CREATE POLICY "Admins can view admin users" ON public.admin_users
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert admin users" ON public.admin_users
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

-- Submissions policies
CREATE POLICY "Admins can view all submissions" ON public.submissions
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update submissions" ON public.submissions
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can insert submissions" ON public.submissions
  FOR INSERT WITH CHECK (true);

-- Investor profiles policies
CREATE POLICY "Admins can manage investor profiles" ON public.investor_profiles
  FOR ALL USING (public.is_admin(auth.uid()));

-- Accelerator applications policies
CREATE POLICY "Admins can view accelerator applications" ON public.accelerator_applications
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update accelerator applications" ON public.accelerator_applications
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can submit accelerator applications" ON public.accelerator_applications
  FOR INSERT WITH CHECK (true);

-- Insert a default admin user (you'll need to replace this with your actual user ID after signing up)
-- This is just a placeholder - you'll need to update it with your actual auth.users ID
-- INSERT INTO public.admin_users (user_id, role) VALUES ('YOUR_USER_ID_HERE', 'admin');
