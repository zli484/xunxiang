/*
  Warnings:

  - The `gender` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- CreateTable
CREATE TABLE "user_saves" (
    "id" SERIAL NOT NULL,
    "saveInitiatorUserId" TEXT NOT NULL,
    "saveReceiverUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_saves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_save_initiator" ON "user_saves"("saveInitiatorUserId");

-- CreateIndex
CREATE INDEX "idx_save_receiver" ON "user_saves"("saveReceiverUserId");

-- AddForeignKey
ALTER TABLE "user_saves" ADD CONSTRAINT "user_saves_saveInitiatorUserId_fkey" FOREIGN KEY ("saveInitiatorUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_saves" ADD CONSTRAINT "user_saves_saveReceiverUserId_fkey" FOREIGN KEY ("saveReceiverUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
