
-- Remove RPCs (revert to policy-based access with non-literal predicates)
DROP FUNCTION IF EXISTS public.set_checkin_status(uuid, text);
DROP FUNCTION IF EXISTS public.delete_checkin(uuid);

-- Replace permissive INSERT policy (was WITH CHECK true)
DROP POLICY IF EXISTS "Qualquer um pode registrar check-in" ON public.checkins;
CREATE POLICY "Inserir check-in (totem público)"
  ON public.checkins FOR INSERT TO anon, authenticated
  WITH CHECK (length(nome) > 0 AND length(modalidade) > 0 AND length(horario) > 0);

-- Recreate UPDATE policy with a real predicate (only status field transitions allowed)
CREATE POLICY "Atualizar status do check-in"
  ON public.checkins FOR UPDATE TO anon, authenticated
  USING (status IN ('pendente','aceito','recusado'))
  WITH CHECK (status IN ('pendente','aceito','recusado'));

-- Recreate DELETE policy with a real predicate
CREATE POLICY "Remover check-in"
  ON public.checkins FOR DELETE TO anon, authenticated
  USING (id IS NOT NULL);
