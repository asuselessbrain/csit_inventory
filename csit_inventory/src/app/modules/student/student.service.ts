import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../../shared/prisma";

const getAllStudentFromDB = async(query) => {
    let inputFilter: Prisma.StudentWhereInput[] = []

    if(query.searchTerm){
        inputFilter.push({OR: [
            { name: { contains: String(query.searchTerm), mode: 'insensitive' } },
            { email: { contains: String(query.searchTerm), mode: 'insensitive' } }
        ]})
    }

    const whereCondition: Prisma.StudentWhereInput = {AND: inputFilter}

    const students = await prisma.student.findMany({where: whereCondition});
    return students;
}

export const StudentService = {
    getAllStudentFromDB
}