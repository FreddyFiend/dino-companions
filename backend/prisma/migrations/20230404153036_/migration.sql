/*
  Warnings:

  - The primary key for the `Roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `Roles` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Roles" (
    "name" TEXT NOT NULL DEFAULT 'user',
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("name", "userId"),
    CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Roles" ("userId") SELECT "userId" FROM "Roles";
DROP TABLE "Roles";
ALTER TABLE "new_Roles" RENAME TO "Roles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
