DROP POLICY IF EXISTS "Qualquer um pode ver os check-ins" ON public.checkins;
DROP POLICY IF EXISTS "Atualizar status do check-in" ON public.checkins;
DROP POLICY IF EXISTS "Remover check-in" ON public.checkins;

REVOKE SELECT, UPDATE, DELETE ON public.checkins FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.checkins FROM authenticated;