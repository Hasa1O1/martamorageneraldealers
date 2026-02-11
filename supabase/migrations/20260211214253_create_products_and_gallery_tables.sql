/*
  # Create Products and Gallery Tables

  ## Overview
  This migration creates the database structure for Martamora General Dealers website, 
  including tables for products/services and portfolio gallery items.

  ## New Tables
  
  ### `products`
  Stores information about herbal products and supplements offered by Martamora General Dealers.
  - `id` (uuid, primary key) - Unique identifier for each product
  - `name` (text) - Product name
  - `description` (text) - Detailed product description
  - `category` (text) - Product category (e.g., "Herbal Supplements", "Teas", "Oils")
  - `image_url` (text) - URL to product image
  - `features` (text[]) - Array of product features/benefits
  - `is_featured` (boolean) - Whether to display on homepage
  - `display_order` (integer) - Order for displaying products
  - `created_at` (timestamptz) - Timestamp of creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ### `gallery_items`
  Stores portfolio/gallery images showcasing products, packaging, and brand materials.
  - `id` (uuid, primary key) - Unique identifier for each gallery item
  - `title` (text) - Gallery item title
  - `description` (text) - Item description
  - `image_url` (text) - URL to gallery image
  - `category` (text) - Gallery category (e.g., "Products", "Packaging", "Events")
  - `display_order` (integer) - Order for displaying items
  - `created_at` (timestamptz) - Timestamp of creation

  ## Security
  - Enable Row Level Security (RLS) on both tables
  - Add policy for public read access (marketing website)
  - Tables are read-only for public users
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  image_url text NOT NULL,
  features text[] DEFAULT ARRAY[]::text[],
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  category text DEFAULT 'General',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (marketing website)
CREATE POLICY "Public can view products"
  ON products
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view gallery items"
  ON gallery_items
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured, display_order);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category, display_order);