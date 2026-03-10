/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DocType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DocType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Institution` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocType" (
    "type" TEXT NOT NULL PRIMARY KEY,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_DocType" ("description", "isActive", "name", "price", "type") SELECT "description", "isActive", "name", "price", "type" FROM "DocType";
DROP TABLE "DocType";
ALTER TABLE "new_DocType" RENAME TO "DocType";
CREATE UNIQUE INDEX "DocType_type_key" ON "DocType"("type");
CREATE INDEX "DocType_type_idx" ON "DocType"("type");
CREATE TABLE "new_Institution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "logo" TEXT
);
INSERT INTO "new_Institution" ("address", "country", "id", "logo", "name") SELECT "address", "country", "id", "logo", "name" FROM "Institution";
DROP TABLE "Institution";
ALTER TABLE "new_Institution" RENAME TO "Institution";
CREATE UNIQUE INDEX "Institution_name_key" ON "Institution"("name");
CREATE INDEX "Institution_name_idx" ON "Institution"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
