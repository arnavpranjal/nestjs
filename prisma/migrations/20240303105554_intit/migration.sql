-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL
);
INSERT INTO "new_deal" ("endDate", "id", "name", "owner", "startDate") SELECT "endDate", "id", "name", "owner", "startDate" FROM "deal";
DROP TABLE "deal";
ALTER TABLE "new_deal" RENAME TO "deal";
CREATE UNIQUE INDEX "deal_name_key" ON "deal"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
