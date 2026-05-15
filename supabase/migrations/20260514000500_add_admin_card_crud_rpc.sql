ALTER TABLE public.gallery_items
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

CREATE OR REPLACE FUNCTION public.admin_update_product(
  p_id uuid,
  p_name text,
  p_description text,
  p_category text,
  p_image_url text,
  p_features text[],
  p_display_order integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  affected_rows integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Admin authentication is required to update products.';
  END IF;

  UPDATE public.products
  SET
    name = p_name,
    description = p_description,
    category = p_category,
    image_url = p_image_url,
    features = p_features,
    display_order = p_display_order,
    updated_at = now()
  WHERE id = p_id;

  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  RETURN affected_rows;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_delete_product(p_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  affected_rows integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Admin authentication is required to delete products.';
  END IF;

  DELETE FROM public.products
  WHERE id = p_id;

  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  RETURN affected_rows;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_update_gallery_item(
  p_id uuid,
  p_title text,
  p_description text,
  p_category text,
  p_image_url text,
  p_display_order integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  affected_rows integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Admin authentication is required to update gallery items.';
  END IF;

  UPDATE public.gallery_items
  SET
    title = p_title,
    description = p_description,
    category = p_category,
    image_url = p_image_url,
    display_order = p_display_order,
    updated_at = now()
  WHERE id = p_id;

  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  RETURN affected_rows;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_delete_gallery_item(p_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  affected_rows integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Admin authentication is required to delete gallery items.';
  END IF;

  DELETE FROM public.gallery_items
  WHERE id = p_id;

  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  RETURN affected_rows;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_update_product(uuid, text, text, text, text, text[], integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_delete_product(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_update_gallery_item(uuid, text, text, text, text, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_delete_gallery_item(uuid) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.admin_update_product(uuid, text, text, text, text, text[], integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_product(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_update_gallery_item(uuid, text, text, text, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_gallery_item(uuid) TO authenticated;
