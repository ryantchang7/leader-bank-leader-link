
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cuxzynvfoedkzjhcsxfp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp5bnZmb2Vka3pqaGNzeGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NTYwMDksImV4cCI6MjA2NTMzMjAwOX0.uh6Dzt-NC11RKewc1V09gEf_OEZih1Qb1ivSZMrCHwk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
