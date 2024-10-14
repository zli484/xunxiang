-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT,
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
    "currentCity" TEXT,
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "personalTags" TEXT[],
    "professionalTags" TEXT[],
    "currentCompany" TEXT,
    "currentRole" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
