import { prisma } from "../../../shared/prisma"

const createTaskIntoDB = async (taskInfo: any) => {

    const result = await prisma.task.create({
        data: taskInfo
    })

    return result
}


export const TaskService = {
    createTaskIntoDB
}
