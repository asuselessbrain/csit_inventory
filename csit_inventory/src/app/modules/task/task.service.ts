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


export const TaskService = {
    createTaskIntoDB,
    updateTaskInDB
}
