-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "directors" TEXT[],
    "coverUrl" TEXT NOT NULL,
    "releaseYear" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFavoriteMovies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavoriteMovies_AB_unique" ON "_UserFavoriteMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavoriteMovies_B_index" ON "_UserFavoriteMovies"("B");

-- AddForeignKey
ALTER TABLE "_UserFavoriteMovies" ADD CONSTRAINT "_UserFavoriteMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteMovies" ADD CONSTRAINT "_UserFavoriteMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
