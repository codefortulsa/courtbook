CREATE TABLE "stakeholders" (
  "id"          BIGSERIAL PRIMARY KEY NOT NULL,
  "courtCaseId" BIGINT                NOT NULL,
  "name"        TEXT                  NOT NULL,
  "contact"     TEXT                  NOT NULL,
  "contactType" TEXT                  NOT NULL DEFAULT 'sms',
  CONSTRAINT "stakeholders" FOREIGN KEY ("courtCaseId") REFERENCES "courtCases" ("id")
)
