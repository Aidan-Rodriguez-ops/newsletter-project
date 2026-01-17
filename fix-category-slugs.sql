-- Fix category_slug values to match the predefined category slugs
-- This updates articles that have incorrect category_slug values

UPDATE articles
SET category_slug = 'contrarian'
WHERE category = 'The Contrarian' AND category_slug != 'contrarian';

UPDATE articles
SET category_slug = 'weekly-brief'
WHERE category = 'Weekly Brief' AND category_slug != 'weekly-brief';

UPDATE articles
SET category_slug = 'daily-snapshot'
WHERE category = 'Daily Snapshot' AND category_slug != 'daily-snapshot';

UPDATE articles
SET category_slug = 'equity-opinions'
WHERE category = 'Equity Opinions' AND category_slug != 'equity-opinions';

UPDATE articles
SET category_slug = 'macro'
WHERE category = 'Macro & Market Structure' AND category_slug != 'macro';

UPDATE articles
SET category_slug = 'current-events'
WHERE category = 'Current Events' AND category_slug != 'current-events';

UPDATE articles
SET category_slug = 'education'
WHERE category = 'Education' AND category_slug != 'education';

-- Verify the updates
SELECT id, title, category, category_slug
FROM articles
ORDER BY category, created_at DESC;
