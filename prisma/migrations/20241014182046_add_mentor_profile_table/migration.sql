-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isMentor" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ExpertiseArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExpertiseArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "yearsOfExperience" INTEGER,
    "pastExperience" TEXT,
    "menteeExpectations" TEXT,
    "menteeQualifications" TEXT[],
    "maxMentees" INTEGER,
    "availability" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MentorExpertise" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpertiseArea_name_key" ON "ExpertiseArea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MentorProfile_userId_key" ON "MentorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_MentorExpertise_AB_unique" ON "_MentorExpertise"("A", "B");

-- CreateIndex
CREATE INDEX "_MentorExpertise_B_index" ON "_MentorExpertise"("B");

-- AddForeignKey
ALTER TABLE "MentorProfile" ADD CONSTRAINT "MentorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorExpertise" ADD CONSTRAINT "_MentorExpertise_A_fkey" FOREIGN KEY ("A") REFERENCES "ExpertiseArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorExpertise" ADD CONSTRAINT "_MentorExpertise_B_fkey" FOREIGN KEY ("B") REFERENCES "MentorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
