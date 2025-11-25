/*
  Warnings:

  - The values [DRAFT] on the enum `CourseStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[courseId,teacherId]` on the table `course_teachers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseStatus_new" AS ENUM ('ACTIVE', 'ARCHIVED');
ALTER TABLE "public"."courses" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "courses" ALTER COLUMN "status" TYPE "CourseStatus_new" USING ("status"::text::"CourseStatus_new");
ALTER TYPE "CourseStatus" RENAME TO "CourseStatus_old";
ALTER TYPE "CourseStatus_new" RENAME TO "CourseStatus";
DROP TYPE "public"."CourseStatus_old";
ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "course_teachers_courseId_teacherId_key" ON "course_teachers"("courseId", "teacherId");
