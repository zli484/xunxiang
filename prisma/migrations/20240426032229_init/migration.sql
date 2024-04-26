CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('SELF_AGENT', 'OTHERS_AGENT');

-- CreateTable
CREATE TABLE "communities" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "memberId" INTEGER,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "nameOtherLang" TEXT,
    "gender" TEXT,
    "careerGoal" TEXT,
    "careerGoalEng" TEXT,
    "graduationYear" INTEGER,
    "email" TEXT,
    "wechatId" TEXT,
    "interests" TEXT,
    "interestsEng" TEXT,
    "hometown" TEXT,
    "hometownEng" TEXT,
    "linkedInLink" TEXT,
    "instagramLink" TEXT,
    "twitterLink" TEXT,
    "xiaohongshuID" TEXT,
    "major" TEXT,
    "majorEng" TEXT,
    "school" TEXT,
    "profilePictureURL" TEXT,
    "phone" TEXT,
    "bio" TEXT,
    "botSummary" TEXT DEFAULT '',
    "joinedDate" TIMESTAMP(3),
    "bioEmbedding" vector,
    "interestEmbedding" vector,
    "careerGoalEmbedding" vector,
    "currentCity" TEXT,
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "personalTags" TEXT[],
    "professionalTags" TEXT[],
    "currentCompany" TEXT,
    "currentRole" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "connections" (
    "id" SERIAL NOT NULL,
    "initiatorUserId" INTEGER NOT NULL,
    "receiverUserId" INTEGER NOT NULL,
    "initiatorMessage" TEXT,
    "status" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_saves" (
    "id" SERIAL NOT NULL,
    "saveInitiatorUserId" INTEGER NOT NULL,
    "saveReceiverUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_saves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "selfDescription" TEXT[],
    "pastExperience" TEXT[],
    "interestsAndPassions" TEXT[],
    "goalsAndDreams" TEXT[],
    "currentStatus" TEXT[],
    "valueAndBelief" TEXT[],
    "additional" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selfDescriptionEmbedding" vector,
    "pastExperienceEmbedding" vector,
    "interestsAndPassionsEmbedding" vector,
    "goalsAndDreamsEmbedding" vector,
    "currentStatusEmbedding" vector,
    "valueAndBeliefEmbedding" vector,
    "additionalEmbedding" vector,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_summaries" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_info_points" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "keyWords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "relevantURL" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_info_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "nanoId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New chat',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "receiverUserId" INTEGER,
    "type" "ChatType" NOT NULL DEFAULT 'SELF_AGENT',

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_memories" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skip" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "chat_memories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "name" TEXT,
    "function_call" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hangout" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "communityId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "hostId" INTEGER NOT NULL,
    "messageFromHost" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hangout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "address" TEXT,
    "coverPhoto" TEXT NOT NULL,
    "photos" TEXT[],
    "highlights" TEXT[],
    "tags" TEXT[],
    "isTimeSensitive" BOOLEAN NOT NULL DEFAULT false,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateDate" TIMESTAMP(3) NOT NULL,
    "activityEmbedding" vector,
    "creatorId" INTEGER,
    "startDateTime" TIMESTAMP(3),
    "endDateTime" TIMESTAMP(3),
    "url" TEXT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "userInfoPointId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommunityToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "communities_cuid_key" ON "communities"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_cuid_key" ON "users"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_userId_key" ON "user_details"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_summaries_cuid_key" ON "user_summaries"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "chats_nanoId_key" ON "chats"("nanoId");

-- CreateIndex
CREATE UNIQUE INDEX "Hangout_cuid_key" ON "Hangout"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "activities_cuid_key" ON "activities"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "images_cuid_key" ON "images"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityToUser_AB_unique" ON "_CommunityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityToUser_B_index" ON "_CommunityToUser"("B");

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_initiatorUserId_fkey" FOREIGN KEY ("initiatorUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_saves" ADD CONSTRAINT "user_saves_saveInitiatorUserId_fkey" FOREIGN KEY ("saveInitiatorUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_saves" ADD CONSTRAINT "user_saves_saveReceiverUserId_fkey" FOREIGN KEY ("saveReceiverUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_summaries" ADD CONSTRAINT "user_summaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_info_points" ADD CONSTRAINT "user_info_points_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_memories" ADD CONSTRAINT "chat_memories_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hangout" ADD CONSTRAINT "Hangout_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hangout" ADD CONSTRAINT "Hangout_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_userInfoPointId_fkey" FOREIGN KEY ("userInfoPointId") REFERENCES "user_info_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToUser" ADD CONSTRAINT "_CommunityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToUser" ADD CONSTRAINT "_CommunityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
