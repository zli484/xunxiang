/*
  Warnings:

  - You are about to drop the column `favoriteBooks` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "favoriteBooks";

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT[],
    "coverUrl" TEXT NOT NULL,
    "publishedYear" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFavoriteBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavoriteBooks_AB_unique" ON "_UserFavoriteBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavoriteBooks_B_index" ON "_UserFavoriteBooks"("B");

-- AddForeignKey
ALTER TABLE "_UserFavoriteBooks" ADD CONSTRAINT "_UserFavoriteBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteBooks" ADD CONSTRAINT "_UserFavoriteBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
