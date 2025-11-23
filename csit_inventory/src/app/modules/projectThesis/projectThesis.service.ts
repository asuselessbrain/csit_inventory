import { pagination } from './../../../shared/pagination';
import { CONNREFUSED } from "dns"
import { prisma } from "../../../shared/prisma"
import { Prisma } from '../../../../generated/prisma';

const createProjectThesisIntoDB = async (projectThesisInfo: any) => {

    const result = await prisma.projectThesis.create({
        data: projectThesisInfo
    })

    return result
}
const getAllProjectThesesFromDB = async (query: any) => {

    const { searchTerm, skip, take, sortBy, sortOrder, ...filterData } = query
    console.log(filterData)

    let inputFields: Prisma.ProjectThesisWhereInput[] = []

    if (searchTerm) {
        inputFields.push({
            OR: [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
                { student: { name: { contains: searchTerm, mode: "insensitive" } } },
                { supervisor: { name: { contains: searchTerm, mode: "insensitive" } } },
                { student: { studentId: { contains: searchTerm, mode: "insensitive" } } }
            ]
        })
    }
    if (Object.keys(filterData).length) {
        Object.entries(filterData).forEach(([field, value]) => {
            if (field === 'session') {
                inputFields.push({
                    student: {
                        session: { equals: value as string }
                    }
                })
            }
            else {
                inputFields.push({
                    [field]: { equals: value }
                })
            }
        }
        )
    }

    const whereCondition: Prisma.ProjectThesisWhereInput = { AND: inputFields }

    const { currentPage, skipValue, takeValue, sortByField, sortOrderValue } = pagination(skip, take, sortBy, sortOrder)

    const result = await prisma.projectThesis.findMany({
        where: whereCondition,
        include: { tasks: true, student: true, supervisor: true },
        skip: skipValue,
        take: takeValue,
        orderBy: { [sortByField]: sortOrderValue }
    })

    const total = await prisma.projectThesis.count({ where: whereCondition })
    return {
        meta: {
            currentPage,
            limit: takeValue,
            total
        },
        data: result
    }
}

const getSingleProjectThesisFromDB = async (id: string) => {
    const result = await prisma.projectThesis.findUniqueOrThrow({
        where: { id },
        include: { tasks: true, student: true, supervisor: true }
    })
    return result
}

const updateProjectThesisInDB = async (id: string, updateInfo: any) => {

    const isProjectThesisExist = await prisma.projectThesis.findUnique({
        where: { id }
    })

    if (!isProjectThesisExist) {
        throw new Error("Project or Thesis not found")
    }

    const updateData = {
        ...updateInfo,
        status: isProjectThesisExist.status
    }
    console.log(updateData)

    const result = await prisma.projectThesis.update({
        where: { id },
        data: updateData
    })

    return result
}

export const ProjectThesisService = {
    createProjectThesisIntoDB,
    getAllProjectThesesFromDB,
    getSingleProjectThesisFromDB,
    updateProjectThesisInDB
}
