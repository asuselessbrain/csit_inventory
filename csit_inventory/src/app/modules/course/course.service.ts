import { Prisma } from "../../../../generated/prisma"
import { prisma } from "../../../shared/prisma"

const createCourseIntoDB = async(data: Prisma.CoursesCreateInput) => {
    const result = await prisma.courses.create({
        data
    })
    return result
}

export const CourseService = {
    createCourseIntoDB
}