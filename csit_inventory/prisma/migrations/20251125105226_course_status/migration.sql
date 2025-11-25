-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('ACTIVE', 'DRAFT', 'ARCHIVED');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "status" "CourseStatus" NOT NULL DEFAULT 'ACTIVE';
