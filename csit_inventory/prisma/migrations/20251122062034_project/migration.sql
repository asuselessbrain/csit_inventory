-- CreateEnum
CREATE TYPE "ProjectThesisType" AS ENUM ('PROJECT', 'THESIS');

-- CreateEnum
CREATE TYPE "ProjectThesisStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'in_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SemesterType" AS ENUM ('1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'REJECTED');

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ProjectThesisType" NOT NULL,
    "status" "ProjectThesisStatus" NOT NULL DEFAULT 'PENDING',
    "studentId" TEXT NOT NULL,
    "supervisorId" TEXT NOT NULL,
    "semester" "SemesterType" NOT NULL DEFAULT '1st',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "projectThesisId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_thesis_update_logs" (
    "id" TEXT NOT NULL,
    "projectThesisId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_thesis_update_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectThesisId_fkey" FOREIGN KEY ("projectThesisId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_thesis_update_logs" ADD CONSTRAINT "project_thesis_update_logs_projectThesisId_fkey" FOREIGN KEY ("projectThesisId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_thesis_update_logs" ADD CONSTRAINT "project_thesis_update_logs_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
