import { equal } from "assert";
import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../../shared/prisma";
import { searching } from "../../../shared/searching";
import { filtering } from "../../../shared/filtering";

const getAllStudentFromDB = async (query) => {
    const { searchTerm, ...filterData } = query;
    const searchFields = ['name', 'email', 'address', 'studentId', 'registrationNumber'];
    let inputFilter: Prisma.StudentWhereInput[] = []

    if (searchTerm) {
        searching(inputFilter, searchFields, searchTerm);
    }

    if (Object.keys(filterData).length > 0) {
        filtering(inputFilter, filterData);
    }

    const whereCondition: Prisma.StudentWhereInput = { AND: inputFilter }

    const students = await prisma.student.findMany({ where: whereCondition });
    return students;
}

export const StudentService = {
    getAllStudentFromDB
}