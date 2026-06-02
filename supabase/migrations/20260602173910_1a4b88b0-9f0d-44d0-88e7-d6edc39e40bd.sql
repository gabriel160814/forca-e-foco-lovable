ALTER TABLE public.checkins ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pendente';

CREATE POLICY "Qualquer um pode atualizar status"
ON public.checkins
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Qualquer um pode deletar"
ON public.checkins
FOR DELETE
TO anon, authenticated
USING (true);