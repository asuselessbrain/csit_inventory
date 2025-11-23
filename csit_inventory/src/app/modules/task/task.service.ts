import { TaskStatus } from "../../../../generated/prisma"
import { prisma } from "../../../shared/prisma"

const createTaskIntoDB = async (taskInfo: any) => {

    const result = await prisma.task.create({
        data: taskInfo
    })

    return result
}

const updateTaskInDB = async(id: string, taskInfo: any) =>{
    const isTaskExist = await prisma.task.findUniqueOrThrow({where: {id}})

    if(!isTaskExist){
        throw new Error("Task not found")
    }

    const result = await prisma.task.update({
        where: {id: isTaskExist.id},
        data: taskInfo
    })

    return result
}

const updateStatusToInProgressInDB = async(id: string) => {
    const isTaskExist = await prisma.task.findUniqueOrThrow({where: {id}})

    if(!isTaskExist){
        throw new Error("Task not found")
    }

    if(isTaskExist.status !== TaskStatus.TODO){
        throw new Error("Only todo task can be set to in-progress")
    }

    const result = await prisma.task.update({
        where: {id: isTaskExist.id},
        data: {status: TaskStatus.IN_PROGRESS}
    })

    return result
}

const updateStatusToReviewInDB = async(id: string) => {
    const isTaskExist = await prisma.task.findUniqueOrThrow({where: {id}})
    if(!isTaskExist){
        throw new Error("Task not found")
    }
    if(isTaskExist.status !== TaskStatus.IN_PROGRESS){
        throw new Error("Only in-progress task can be set to review")
    }
    const result = await prisma.task.update({
        where: {id: isTaskExist.id},
        data: {status: TaskStatus.REVIEW}
    })
    return result
}


export const TaskService = {
    createTaskIntoDB,
    updateTaskInDB,
    updateStatusToInProgressInDB,
    updateStatusToReviewInDB
}
