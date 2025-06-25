
// Legacy Supabase client - DEPRECATED
// This file is kept for compatibility but all functionality has been moved to internal bank APIs
// File: src/lib/internalApi.ts

import { internalApi } from '@/lib/internalApi';

// Export a compatibility object to prevent import errors
// All actual functionality now goes through internalApi
export const supabase = {
  // Deprecated - use internalApi instead
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ error: 'Auth disabled - use internal bank systems' }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    insert: () => Promise.resolve({ data: null, error: 'Database disabled - use internal bank APIs' }),
    select: () => Promise.resolve({ data: [], error: 'Database disabled - use internal bank APIs' }),
    update: () => Promise.resolve({ data: null, error: 'Database disabled - use internal bank APIs' }),
    delete: () => Promise.resolve({ data: null, error: 'Database disabled - use internal bank APIs' }),
  }),
  functions: {
    invoke: () => Promise.resolve({ data: null, error: 'Functions disabled - use internal bank APIs' }),
  },
  rpc: () => Promise.resolve({ data: null, error: 'RPC disabled - use internal bank APIs' }),
};

// Re-export internal API for new code
export { internalApi };

console.warn('Supabase client is deprecated. Use internalApi from @/lib/internalApi instead.');
