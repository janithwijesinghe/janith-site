/*
  # Create Portfolio Database Schema

  ## Overview
  This migration creates the database structure for a modern portfolio website
  with support for projects, categories, and media assets.

  ## New Tables
  
  ### `projects`
  - `id` (uuid, primary key) - Unique identifier for each project
  - `title` (text) - Project title
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Detailed project description
  - `category` (text) - Project category (Social Media, 2D Animation, AI Video, Web Development)
  - `thumbnail_url` (text) - Main thumbnail image URL
  - `video_url` (text, nullable) - Optional video URL
  - `external_link` (text, nullable) - Optional external project link
  - `images` (jsonb) - Array of additional image URLs
  - `videos` (jsonb) - Array of additional video URLs
  - `featured` (boolean) - Whether to show on homepage
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access (portfolio is public)
  - Restrict write access to authenticated users only

  ## Indexes
  - Index on slug for faster lookups
  - Index on category for filtering
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL,
  thumbnail_url text NOT NULL,
  video_url text,
  external_link text,
  images jsonb DEFAULT '[]'::jsonb,
  videos jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read projects (public portfolio)
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can insert projects
CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update projects
CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete projects
CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);
