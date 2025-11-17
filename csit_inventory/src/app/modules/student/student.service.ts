import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../../shared/prisma";

const getAllStudentFromDB = async (query) => {
    const searchFields = ['name', 'email', 'address'];
    let inputFilter: Prisma.StudentWhereInput[] = []

    if (query.searchTerm) {
        inputFilter.push({
            OR: searchFields.map(field => ({ [field]: { contains: String(query.searchTerm), mode: 'insensitive' } })
            )
        })
    }

    const whereCondition: Prisma.StudentWhereInput = { AND: inputFilter }

    const students = await prisma.student.findMany({ where: whereCondition });
    return students;
}

export const StudentService = {
    getAllStudentFromDB
}