import { pagination } from './../../../shared/pagination';
import { CONNREFUSED } from "dns"
import { prisma } from "../../../shared/prisma"
import { Prisma } from '../../../../generated/prisma';
import { searching } from '../../../shared/searching';

const createProjectThesisIntoDB = async (projectThesisInfo: any) => {

    const result = await prisma.projectThesis.create({
        data: projectThesisInfo
    })

    return result
}
const getAllProjectThesesFromDB = async (query: any) => {

    const { searchTerm, ...filterData } = query

    let inputFields: Prisma.ProjectThesisWhereInput[] = []

    if (searchTerm) {
        inputFields.push({
            OR: [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
                { student: { name: { contains: searchTerm, mode: "insensitive" } } }
            ]
        })
    }

    const whereCondition: Prisma.ProjectThesisWhereInput = { AND: inputFields }
    const { currentPage, skipValue, takeValue, sortByField, sortOrderValue } = pagination()
    const result = await prisma.projectThesis.findMany({ where: whereCondition, include: { tasks: true, student: true, supervisor: true }, skip: skipValue, take: takeValue, orderBy: { [sortByField]: sortOrderValue } })
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


export const ProjectThesisService = {
    createProjectThesisIntoDB,
    getAllProjectThesesFromDB
}
