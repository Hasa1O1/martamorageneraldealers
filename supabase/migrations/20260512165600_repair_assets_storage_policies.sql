INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

DROP POLICY IF EXISTS "Public can read assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete assets" ON storage.objects;

CREATE POLICY "Public can read assets"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'assets');

CREATE POLICY "Authenticated users can upload assets"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'assets');

CREATE POLICY "Authenticated users can update assets"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'assets')
  WITH CHECK (bucket_id = 'assets');

CREATE POLICY "Authenticated users can delete assets"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'assets');
