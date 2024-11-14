-- CreateEnum
CREATE TYPE "RoleGroup" AS ENUM ('DATA_SCIENTIST', 'SOFTWARE_ENGINEER', 'CONSULTANT', 'PRODUCT_MANAGER', 'PROGRAM_MANAGER', 'INVESTMENT_BANKING_ANALYST', 'PRIVATE_EQUITY_ANALYST', 'FOUNDER', 'SOLUTIONS_ENGINEER', 'ACCOUNT_EXECUTIVE', 'ACTUARIAL_ANALYST', 'MARKETING_MANAGER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roleGroup" "RoleGroup";