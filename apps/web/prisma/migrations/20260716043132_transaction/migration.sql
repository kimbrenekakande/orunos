/*
  Warnings:

  - Added the required column `appfee` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authModelUsed` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chargedAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flwRef` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderRef` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `txRef` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactionId" TEXT NOT NULL,
    "txRef" TEXT NOT NULL,
    "orderRef" TEXT NOT NULL,
    "flwRef" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "chargedAmount" INTEGER NOT NULL,
    "appfee" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "authModelUsed" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "createdAt", "description", "id", "type", "userId") SELECT "amount", "createdAt", "description", "id", "type", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
