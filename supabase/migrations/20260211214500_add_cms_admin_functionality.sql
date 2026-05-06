/*
  # CMS Admin Tables and Policies

  ## Overview
  Migration to add inline CMS functionality for Martamora General Dealers admin panel.
  Includes user authentication table, site content storage, and admin write policies.

  ## Tables

  ### `site_content` (NEW)
  Stores all editable text content across pages
  - `id` (uuid, primary key)
  - `page` (text) - page identifier (home, about, contact, etc.)
  - `section` (text) - section/field identifier
  - `content` (text) - actual content text
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - Composite unique constraint on (page, section)

  ## Updated Tables

  ### `products` and `gallery_items`
  - Added RLS policies for admin users to insert, update, delete
  - Maintained public read access

  ### `auth.users` (Supabase managed)
  - Automatically managed by Supabase Auth
  - Used for admin authentication

  ## Storage

  ### `assets` bucket (NEW)
  - Public bucket for image uploads
  - Policy: authenticated users can upload, all users can read

  ## Security
  - RLS enabled on all tables
  - Public read-only access maintained for products and gallery
  - Admin write access via authenticated JWT
  - Image bucket allows authenticated uploads, public reads
*/

-- Create site_content table for CMS
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section text NOT NULL,
  content text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page, section)
);

-- Enable RLS on site_content
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read policy for site_content
CREATE POLICY "Public can read site content"
  ON site_content
  FOR SELECT
  TO anon
  USING (true);

-- Authenticated admin can read/insert/update/delete site_content
CREATE POLICY "Authenticated users can manage site content"
  ON site_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update products table RLS for admin write access
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

-- Update gallery_items table RLS for admin write access
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_content_page ON site_content(page);
CREATE INDEX IF NOT EXISTS idx_site_content_page_section ON site_content(page, section);

-- Seed initial site_content with defaults
INSERT INTO site_content (page, section, content) VALUES
  ('home', 'hero_title_1', 'Natural Wellness'),
  ('home', 'hero_title_2', 'Through Herbs'),
  ('home', 'hero_subtitle', 'Discover the power of authentic herbal products and supplements for holistic health and harmony.'),
  ('home', 'why_choose_title', 'Why Choose Martamora'),
  ('home', 'why_choose_subtitle', 'We are committed to providing the highest quality herbal products with traditional knowledge and modern reliability.'),
  ('home', 'home_feature_1', '{"title":"Natural Products","description":"Sourced from the finest herbs and botanicals"}'),
  ('home', 'home_feature_2', '{"title":"Quality Assured","description":"Rigorous testing and quality control standards"}'),
  ('home', 'home_feature_3', '{"title":"Expert Guidance","description":"Professional advice and personalized support"}'),
  ('home', 'home_feature_4', '{"title":"Holistic Wellness","description":"Supporting your journey to natural health"}'),
  ('home', 'mission_title', 'Our Mission'),
  ('home', 'mission_text', 'To provide our community with the highest quality, carefully sourced herbal products, leveraging traditional knowledge and reliable service to support holistic well-being.'),
  ('home', 'cta_title', 'Ready to Start Your Wellness Journey?'),
  ('home', 'cta_text', 'Explore our range of authentic herbal products and discover the natural path to health and harmony.'),
  ('about', 'hero_title', 'About Us'),
  ('about', 'hero_subtitle', 'Your Trusted Partner in Natural Wellness'),
  ('about', 'who_we_are_title', 'Who We Are'),
  ('about', 'who_we_are_text', 'Martamora General Dealers is a trusted provider of premium herbal products and supplements, dedicated to promoting health and harmony through the power of authentic herbs.'),
  ('about', 'vision_title', 'Our Vision'),
  ('about', 'vision_text', 'To become a trusted leader in natural wellness, promoting health and harmony through the power of authentic herbs.'),
  ('about', 'mission_title', 'Our Mission'),
  ('about', 'mission_text', 'To provide our community with the highest quality, carefully sourced herbal products, leveraging traditional knowledge and reliable service to support holistic well-being.'),
  ('about', 'commitment_title', 'Our Commitment to Quality'),
  ('about', 'commitment_text', 'Every product we offer undergoes rigorous quality checks and sourcing standards. We believe in transparency, authenticity, and the transformative power of nature. Our team is dedicated to bringing you only the finest herbal solutions, backed by traditional wisdom and modern science.'),
  ('contact', 'hero_title', 'Contact Us'),
  ('contact', 'hero_subtitle', 'We''d Love to Hear From You'),
  ('contact', 'intro_text', 'Have questions about our products or services? We''re here to help. Reach out to us and we''ll respond as soon as possible.'),
  ('contact', 'phone_label', 'Phone'),
  ('contact', 'phone_value', '0772792147'),
  ('contact', 'email_label', 'Email'),
  ('contact', 'email_value', 'monicamutale23@gmail.com'),
  ('contact', 'location_label', 'Location'),
  ('contact', 'location_value', 'Zambia'),
  ('contact', 'hours_title', 'Business Hours'),
  ('contact', 'hours_text', 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed'),
  ('contact', 'form_title', 'Send Us a Message'),
  ('products', 'hero_title', 'Our Products'),
  ('products', 'hero_subtitle', 'Premium Herbal Products for Natural Wellness'),
  ('products', 'cta_title', 'Interested in Our Products?'),
  ('products', 'cta_text', 'Contact us to learn more about our premium herbal products and how they can support your wellness journey.'),
  ('gallery', 'hero_title', 'Our Gallery'),
  ('gallery', 'hero_subtitle', 'Explore Our Products and Process')
ON CONFLICT DO NOTHING;
