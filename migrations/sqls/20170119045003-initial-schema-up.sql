CREATE TABLE "courtCases" (
  "id"         BIGSERIAL PRIMARY KEY NOT NULL,
  "caseNumber" TEXT                  NOT NULL,
  "defendant"  TEXT                  NOT NULL
);

CREATE TABLE "courtCaseEvents" (
  "id"   BIGSERIAL PRIMARY KEY    NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "courtCaseId" BIGINT NOT NULL,
  CONSTRAINT courtCaseEvents_courtCases_fk FOREIGN KEY ("courtCaseId") REFERENCES "courtCases" ("id")
);

-- CREATE TABLE caseStakeHolders (
--   id          BIGSERIAL PRIMARY KEY NOT NULL,
--   caseId      BIGINT                NOT NULL,
--   name        TEXT                  NOT NULL,
--   phoneNumber TEXT                  NOT NULL,
--   CONSTRAINT caseStakeHolders FOREIGN KEY (caseId) REFERENCES cases (id)
-- )
