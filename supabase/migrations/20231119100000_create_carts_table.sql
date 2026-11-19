-- Migration: create carts table for LeadCapture
-- Supabase SQL migration to store cart per authenticated user

CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    items JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{productId:string,quantity:number}]
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON public.carts(user_id);

-- Trigger to update updated_at on row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_carts_updated_at
    BEFORE UPDATE ON public.carts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;

-- Policies: allow users to manage their own cart
CREATE POLICY "Allow users to insert their cart"
    ON public.carts
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to select their cart"
    ON public.carts
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Allow users to update their cart"
    ON public.carts
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

-- Optional: public insert for guest carts (no user_id) – handled on client side via localStorage
