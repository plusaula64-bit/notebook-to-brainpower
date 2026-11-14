CREATE TABLE public.progress_backups (
  user_id uuid PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  device text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.progress_backups TO authenticated;
GRANT ALL ON public.progress_backups TO service_role;
ALTER TABLE public.progress_backups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own backup" ON public.progress_backups FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own backup" ON public.progress_backups FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own backup" ON public.progress_backups FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own backup" ON public.progress_backups FOR DELETE TO authenticated USING (auth.uid() = user_id);