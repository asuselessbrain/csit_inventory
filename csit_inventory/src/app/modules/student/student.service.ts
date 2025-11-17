import { equal } from "assert";
import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../../shared/prisma";
import { searching } from "../../../shared/searching";
import { filtering } from "../../../shared/filtering";
import { pagination } from "../../../shared/pagination";

const getAllStudentFromDB = async (query: any) => {
    const { searchTerm, skip, take, sortBy, sortOrder, ...filterData } = query;

    const searchFields = ['name', 'email', 'address', 'studentId', 'registrationNumber'];
    let inputFilter: Prisma.StudentWhereInput[] = []

    if (searchTerm) {
        searching(inputFilter, searchFields, searchTerm);
    }

    if (Object.keys(filterData).length > 0) {
        filtering(inputFilter, filterData);
    }

    const { currentPage, skipValue, takeValue, sortByField, sortOrderValue } = pagination(Number(skip), Number(take), sortBy, sortOrder);

    const whereCondition: Prisma.StudentWhereInput = { AND: inputFilter }

    const students = await prisma.student.findMany({ where: whereCondition, skip: skipValue, take: takeValue , orderBy: { [sortByField]: sortOrderValue } });

    const total = await prisma.student.count({ where: whereCondition });
    return {
        meta: {
            currentPage,
            limit: takeValue,
            total
        },
        data: students
    };
}

export const StudentService = {
    getAllStudentFromDB
}