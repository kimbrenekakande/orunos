-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "docTypeId" TEXT NOT NULL,
    "title" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "status" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Document_docTypeId_fkey" FOREIGN KEY ("docTypeId") REFERENCES "DocType" ("type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("answer", "cost", "createdAt", "docTypeId", "id", "question", "status", "title", "updatedAt", "userId") SELECT "answer", "cost", "createdAt", "docTypeId", "id", "question", "status", "title", "updatedAt", "userId" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE INDEX "Document_userId_idx" ON "Document"("userId");
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
    "balanceAfter" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "appfee", "authModelUsed", "chargedAmount", "createdAt", "currency", "description", "flwRef", "id", "orderRef", "paymentType", "phoneNumber", "status", "transactionId", "txRef", "type", "userId") SELECT "amount", "appfee", "authModelUsed", "chargedAmount", "createdAt", "currency", "description", "flwRef", "id", "orderRef", "paymentType", "phoneNumber", "status", "transactionId", "txRef", "type", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
