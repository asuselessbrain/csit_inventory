import { Prisma } from "../../../../generated/prisma/client";
import { TaskStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
import { filtering } from "../../../shared/filtering";
import { pagination } from "../../../shared/pagination";
import { searching } from "../../../shared/searching";

const createTaskIntoDB = async (taskInfo: any) => {
  const result = await prisma.task.create({
    data: taskInfo,
  });

  return result;
};

const updateTaskInDB = async (id: string, taskInfo: any) => {
  const isTaskExist = await prisma.task.findUniqueOrThrow({ where: { id } });

  if (!isTaskExist) {
    throw new Error("Task not found");
  }

  const result = await prisma.task.update({
    where: { id: isTaskExist.id },
    data: taskInfo,
  });

  return result;
};

const updateStatusToInProgressInDB = async (id: string) => {
  const isTaskExist = await prisma.task.findUniqueOrThrow({ where: { id } });

  if (!isTaskExist) {
    throw new Error("Task not found");
  }

  if (isTaskExist.status !== TaskStatus.TODO) {
    throw new Error("Only todo task can be set to in-progress");
  }

  const result = await prisma.task.update({
    where: { id: isTaskExist.id },
    data: { status: TaskStatus.IN_PROGRESS },
  });

  return result;
};

const updateStatusToReviewInDB = async (id: string, updateData: any) => {
  const isTaskExist = await prisma.task.findUniqueOrThrow({ where: { id } });
  if (!isTaskExist) {
    throw new Error("Task not found");
  }
  if (isTaskExist.status !== TaskStatus.IN_PROGRESS) {
    throw new Error("Only in-progress task can be set to review");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.task.update({
      where: { id: isTaskExist.id },
      data: { status: TaskStatus.REVIEW },
    });
    const logData = await transactionClient.projectThesisUpdateLog.create({
      data: {
        projectThesisId: isTaskExist.projectThesisId,
        taskId: isTaskExist.id,
        liveLink: updateData.liveLink,
        fileUrl: updateData.fileUrl,
      },
    });
    return logData;
  });

  return result;
};

const updateStatusToDoneInDB = async (id: string) => {
  const isTaskExist = await prisma.task.findUniqueOrThrow({ where: { id } });

  if (!isTaskExist) {
    throw new Error("Task not found");
  }

  if (isTaskExist.status !== TaskStatus.REVIEW) {
    throw new Error("Only review task can be set to done");
  }

  const result = await prisma.task.update({
    where: { id: isTaskExist.id },
    data: { status: TaskStatus.DONE },
  });

  return result;
};

const updateStatusToRejectedInDB = async (id: string, rejectionNote: any) => {
  const isTaskExist = await prisma.task.findUniqueOrThrow({ where: { id } });

  if (!isTaskExist) {
    throw new Error("Task not found");
  }

  if (isTaskExist.status !== TaskStatus.REVIEW) {
    throw new Error("Only review task can be rejected");
  }

  const data = {
    ...rejectionNote,
    status: TaskStatus.IN_PROGRESS,
  };

  const result = await prisma.task.update({
    where: { id: isTaskExist.id },
    data: data,
  });

  return result;
};

const rejectTask = async (id: string, rejectionNote: any) => {
  const isTaskExist = await prisma.task.findUniqueOrThrow({ where: { id } });

  if (!isTaskExist) {
    throw new Error("Task not found");
  }

  if (isTaskExist.status !== TaskStatus.REVIEW) {
    throw new Error("Only review task can be rejected");
  }

  const data = {
    ...rejectionNote,
    status: TaskStatus.FAILED,
  };

  const result = await prisma.task.update({
    where: { id: isTaskExist.id },
    data: data,
  });

  return result;
};

const getAllTasksForStudent = async (email: string, query: any) => {
  const { searchTerm, skip, take, sortBy, sortOrder, ...filterData } = query;

  const searchFields = ["title", "description", "projectThesis.projectTitle", "projectThesis.course.courseCode", "projectThesis.course.courseName"];

  let inputFilter: Prisma.TaskWhereInput[] = [];

  if (searchTerm) {
    searching(inputFilter, searchFields, searchTerm);
  }

  if (Object.keys(filterData).length > 0) {
    filtering(inputFilter, filterData);
  }

  const { currentPage, skipValue, takeValue, sortByField, sortOrderValue } =
    pagination(Number(skip), Number(take), sortBy, sortOrder);

  const whereCondition: Prisma.TaskWhereInput = { AND: inputFilter };

  const tasks = await prisma.task.findMany({
    where: whereCondition,
    skip: skipValue,
    take: takeValue,
    orderBy: { [sortByField]: sortOrderValue },
    include: {
        projectThesis: {
            include: {
                course: true,
            }
        }
    }
  });

  const total = await prisma.task.count({ where: whereCondition });

  const totalPages = Math.ceil(total / takeValue);

  return {
    meta: {
      currentPage,
      limit: takeValue,
      total,
      totalPages
    },
    data: tasks,
  };
};

export const TaskService = {
  createTaskIntoDB,
  updateTaskInDB,
  updateStatusToInProgressInDB,
  updateStatusToReviewInDB,
  updateStatusToDoneInDB,
  updateStatusToRejectedInDB,
  rejectTask,
  getAllTasksForStudent,
};
