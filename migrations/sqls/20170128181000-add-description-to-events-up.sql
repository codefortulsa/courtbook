ALTER TABLE "courtCaseEvents"
  ADD COLUMN "description" TEXT;

UPDATE "courtCaseEvents"
SET description = 'Unknown';

ALTER TABLE "courtCaseEvents"
  ALTER COLUMN description SET NOT NULL;
