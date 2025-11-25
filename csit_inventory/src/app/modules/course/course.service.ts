import { Prisma } from "../../../../generated/prisma"
import { filtering } from "../../../shared/filtering"
import { pagination } from "../../../shared/pagination"
import { prisma } from "../../../shared/prisma"
import { searching } from "../../../shared/searching"

const createCourseIntoDB = async(data: Prisma.CoursesCreateInput) => {
    const result = await prisma.courses.create({
        data
    })
    return result
}

const getAllCoursesFromDB = async(query: any) => {
    const {searchTerm, skip, take, sortBy, sortOrder, ...filterData} = query

    let filterInput :Prisma.CoursesWhereInput[] = []

    if(searchTerm){
        searching(filterInput, ['courseCode', 'courseName'], searchTerm)
    }

    if(Object.keys(filterData).length){
        filtering(filterInput, filterData)
    }

    const { currentPage, skipValue, takeValue, sortByField, sortOrderValue } = pagination(skip, take, sortBy, sortOrder)

    const whereCondition: Prisma.CoursesWhereInput = {AND: filterInput}

    const result = await prisma.courses.findMany({where: whereCondition, skip: skipValue, take: takeValue, orderBy: {[sortByField]: sortOrderValue}})

    const total = await prisma.courses.count({where: whereCondition})
    return {
        meta: {
            currentPage,
            limit: takeValue,
            total
        },
        data: result
    }
}

export const CourseService = {
    createCourseIntoDB,
    getAllCoursesFromDB
}