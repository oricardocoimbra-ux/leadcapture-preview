"use client";

/**
 * Minimal stub of Supabase client for preview deployments.
 * This avoids needing the real @supabase/supabase-js package during
 * development/preview when no backend integration is required.
 * The API surface matches the parts used by CartProvider:
 *   - supabase.auth.getUser()
 *   - supabase.auth.onAuthStateChange()
 *   - supabase.from('carts').select(...).eq(...).single()
 *   - supabase.from('carts').upsert(...)
 * All methods are no‑ops that resolve to empty data structures.
 * In a real production environment you should replace this file with the
 * genuine Supabase client (install @supabase/supabase-js and configure the
 * environment variables).
 */

type AuthUser = { id: string } | null;

const supabase = {
  auth: {
    async getUser() {
      return { data: { user: null as AuthUser } };
    },
    onAuthStateChange(_callback: (event: string, session: { user?: { id: string } } | null) => void) {
      // No real auth – return a dummy unsubscribe function.
      return { data: { unsubscribe: () => {} } };
    },
  },
  from(_table: string) {
    return {
      select(_cols?: string) {
        return {
          eq(_col: string, _value: unknown) {
            return {
              async single() {
                return { data: null, error: null };
              },
            };
          },
        };
      },
      async upsert(_payload: any, _options?: any) {
        return { error: null };
      },
    };
  },
} as const;

export { supabase };
