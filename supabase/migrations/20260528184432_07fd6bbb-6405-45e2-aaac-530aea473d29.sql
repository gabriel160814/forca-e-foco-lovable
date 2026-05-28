CREATE TABLE public.checkins (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  telefone text,
  modalidade text NOT NULL,
  horario text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.checkins TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.checkins TO authenticated;
GRANT ALL ON public.checkins TO service_role;

ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode registrar check-in"
  ON public.checkins FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Qualquer um pode ver os check-ins"
  ON public.checkins FOR SELECT
  TO anon, authenticated
  USING (true);