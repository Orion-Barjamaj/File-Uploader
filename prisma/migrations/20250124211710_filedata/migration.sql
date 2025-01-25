/*
  Warnings:

  - You are about to drop the column `path` on the `Files` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileData` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" DROP COLUMN "path",
ADD COLUMN     "fileData" BYTEA NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_userId_key" ON "Folder"("userId");
