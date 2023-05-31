/*
  Warnings:

  - Made the column `sellerId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageThumb" TEXT NOT NULL,
    "imageDeleteUrl" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN DEFAULT false,
    "sellerId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("createdAt", "description", "id", "imageDeleteUrl", "imageThumb", "imageUrl", "price", "published", "quantity", "sellerId", "title", "updatedAt") SELECT "createdAt", "description", "id", "imageDeleteUrl", "imageThumb", "imageUrl", "price", "published", "quantity", "sellerId", "title", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_productId_userId_key" ON "Reviews"("productId", "userId");
