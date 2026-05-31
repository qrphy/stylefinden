-- Fix CRITICAL: Security Definer View warnings
-- Views must run with the querying user's privileges (SECURITY INVOKER)
-- to respect RLS policies and prevent privilege escalation.

ALTER VIEW public.piece_click_counts SET (security_invoker = true);
ALTER VIEW public.outfit_click_summary SET (security_invoker = true);
