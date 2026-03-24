import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://psnpwqmpcvceqvnncxvc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzbnB3cW1wY3ZjZXF2bm5jeHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTg1NDcsImV4cCI6MjA4OTU3NDU0N30.2DvdrzZrC3cDfI8aBEu6B4Vz9GmfylmlHHvNQH_e3gg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;

  category_id: {
  name: string;
} | null;

  category?: {
    name: string;
  };

  thumbnail_url: string;
  video_url?: string;
  external_link?: string;
  images: string[];
  videos: string[];
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}