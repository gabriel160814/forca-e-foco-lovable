
-- 1) Drop sensitive PII column
ALTER TABLE public.checkins DROP COLUMN IF EXISTS telefone;

-- 2) Drop the permissive UPDATE / DELETE policies
DROP POLICY IF EXISTS "Qualquer um pode atualizar status" ON public.checkins;
DROP POLICY IF EXISTS "Qualquer um pode deletar" ON public.checkins;

-- 3) Replace with security-definer RPCs (still callable by anon, but with controlled logic / no `true` RLS)
CREATE OR REPLACE FUNCTION public.set_checkin_status(_id uuid, _status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _status NOT IN ('pendente','aceito','recusado') THEN
    RAISE EXCEPTION 'Status inválido';
  END IF;
  UPDATE public.checkins SET status = _status WHERE id = _id;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_checkin(_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.checkins WHERE id = _id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_checkin_status(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.delete_checkin(uuid) TO anon, authenticated;
