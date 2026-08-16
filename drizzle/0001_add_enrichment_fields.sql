-- Add enrichment fields to stadiums table
ALTER TABLE "stadiums"
ADD COLUMN "club_logo_url" text DEFAULT '' NOT NULL,
ADD COLUMN "club_color_primary" text DEFAULT '' NOT NULL,
ADD COLUMN "club_color_secondary" text DEFAULT '' NOT NULL,
ADD COLUMN "airport_name" text DEFAULT '' NOT NULL,
ADD COLUMN "airport_logo_url" text DEFAULT '' NOT NULL;

-- Add metro line fields to stadium_translations table
ALTER TABLE "stadium_translations"
ADD COLUMN "metro_line_names" jsonb DEFAULT '[]'::jsonb NOT NULL,
ADD COLUMN "metro_line_colors" jsonb DEFAULT '[]'::jsonb NOT NULL;
