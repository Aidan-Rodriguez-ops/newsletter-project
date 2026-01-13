-- Script to delete all articles from the database
-- Run this in your Supabase SQL Editor

-- Delete all articles
DELETE FROM articles;

-- Optional: Reset the auto-increment if you want
-- (This will reset any sequence counters)
-- ALTER SEQUENCE articles_id_seq RESTART WITH 1;

-- Verify deletion
SELECT COUNT(*) as remaining_articles FROM articles;
