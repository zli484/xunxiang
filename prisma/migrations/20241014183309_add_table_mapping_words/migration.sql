/*
  Warnings:

  - You are about to drop the `ExpertiseArea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenteeProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MentorProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenteeProfile" DROP CONSTRAINT "MenteeProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "MentorProfile" DROP CONSTRAINT "MentorProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MentorExpertise" DROP CONSTRAINT "_MentorExpertise_A_fkey";

-- DropForeignKey
ALTER TABLE "_MentorExpertise" DROP CONSTRAINT "_MentorExpertise_B_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_menteeId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_mentorId_fkey";

-- DropTable
DROP TABLE "ExpertiseArea";

-- DropTable
DROP TABLE "MenteeProfile";

-- DropTable
DROP TABLE "MentorProfile";

-- CreateTable
CREATE TABLE "expertise_areas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "expertise_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentor_profiles" (
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

    CONSTRAINT "mentor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentee_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "careerGoals" TEXT,
    "currentChallenges" TEXT,
    "mentorPreferences" TEXT,
    "availability" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentee_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "expertise_areas_name_key" ON "expertise_areas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mentor_profiles_userId_key" ON "mentor_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "mentee_profiles_userId_key" ON "mentee_profiles"("userId");

-- AddForeignKey
ALTER TABLE "mentor_profiles" ADD CONSTRAINT "mentor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentee_profiles" ADD CONSTRAINT "mentee_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "mentee_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorExpertise" ADD CONSTRAINT "_MentorExpertise_A_fkey" FOREIGN KEY ("A") REFERENCES "expertise_areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorExpertise" ADD CONSTRAINT "_MentorExpertise_B_fkey" FOREIGN KEY ("B") REFERENCES "mentor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
