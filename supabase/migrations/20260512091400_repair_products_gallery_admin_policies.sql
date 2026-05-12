DROP POLICY IF EXISTS "Public can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;
DROP POLICY IF EXISTS "Public can view gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Authenticated users can view gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Authenticated users can insert gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Authenticated users can update gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Authenticated users can delete gallery items" ON gallery_items;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Public can view gallery items"
  ON gallery_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert gallery items"
  ON gallery_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery items"
  ON gallery_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery items"
  ON gallery_items
  FOR DELETE
  TO authenticated
  USING (true);
