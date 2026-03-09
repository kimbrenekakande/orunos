/*
  Warnings:

  - You are about to drop the `Institution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `institutionId` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `DocType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Institution_name_idx";

-- DropIndex
DROP INDEX "Institution_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Institution";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocType" (
    "type" TEXT NOT NULL PRIMARY KEY,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_DocType" ("description", "isActive", "name", "price", "type") SELECT "description", "isActive", "name", "price", "type" FROM "DocType";
DROP TABLE "DocType";
ALTER TABLE "new_DocType" RENAME TO "DocType";
CREATE UNIQUE INDEX "DocType_type_key" ON "DocType"("type");
CREATE INDEX "DocType_type_idx" ON "DocType"("type");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "style" TEXT,
    "image" TEXT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_user" ("admin", "balance", "createdAt", "email", "emailVerified", "id", "image", "name", "style", "updatedAt") SELECT "admin", "balance", "createdAt", "email", "emailVerified", "id", "image", "name", "style", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
