/*
  Warnings:

  - You are about to drop the column `menteeId` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `mentorId` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `menteeId` on the `mentorships` table. All the data in the column will be lost.
  - You are about to drop the column `mentorId` on the `mentorships` table. All the data in the column will be lost.
  - Added the required column `menteeProfileId` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentorProfileId` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menteeProfileId` to the `mentorships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentorProfileId` to the `mentorships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_menteeId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "mentorships" DROP CONSTRAINT "mentorships_menteeId_fkey";

-- DropForeignKey
ALTER TABLE "mentorships" DROP CONSTRAINT "mentorships_mentorId_fkey";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "menteeId",
DROP COLUMN "mentorId",
ADD COLUMN     "menteeProfileId" TEXT NOT NULL,
ADD COLUMN     "mentorProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "mentorships" DROP COLUMN "menteeId",
DROP COLUMN "mentorId",
ADD COLUMN     "menteeProfileId" TEXT NOT NULL,
ADD COLUMN     "mentorProfileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_menteeProfileId_fkey" FOREIGN KEY ("menteeProfileId") REFERENCES "mentee_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_mentorProfileId_fkey" FOREIGN KEY ("mentorProfileId") REFERENCES "mentor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_menteeProfileId_fkey" FOREIGN KEY ("menteeProfileId") REFERENCES "mentee_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_mentorProfileId_fkey" FOREIGN KEY ("mentorProfileId") REFERENCES "mentor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
