import { searching } from "../../../shared/searching";
import { filtering } from "../../../shared/filtering";
import { pagination } from "../../../shared/pagination";
import { Prisma, UserStatus } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

const getAllTeacherFromDB = async (query: any) => {
    const { searchTerm, skip, take, sortBy, sortOrder, ...filterData } = query;

    const searchFields = ['name', 'email'];
    let inputFilter: Prisma.TeacherWhereInput[] = []

    if (searchTerm) {  
        searching(inputFilter, searchFields, searchTerm);
    }

    if (Object.keys(filterData).length > 0) {
        filtering(inputFilter, filterData);
    }

    const { currentPage, skipValue, takeValue, sortByField, sortOrderValue } = pagination(Number(skip), Number(take), sortBy, sortOrder);

    const whereCondition: Prisma.TeacherWhereInput = { AND: inputFilter }

    const teachers = await prisma.teacher.findMany({ where: whereCondition, skip: skipValue, take: takeValue, orderBy: { [sortByField]: sortOrderValue } });

    const total = await prisma.teacher.count({ where: whereCondition });
    return {
        meta: {
            currentPage,
            limit: takeValue,
            total
        },
        data: teachers
    };
}

const getSingleTeacherFromDB = async (id: string) => {
    const teacher = await prisma.teacher.findUniqueOrThrow({
        where: { id }
    })
    return teacher;
}

const updateTeacherIntoDB = async (id: string, updateData: any) => {
    const isTeacherExist = await prisma.teacher.findUniqueOrThrow({
        where: { id }
    })

    if (isTeacherExist) {
        const updateTeacher = await prisma.teacher.update({
            where: { id: isTeacherExist.id },
            data: updateData
        })
        return updateTeacher;
    }

}

const deleteTeacherFromDB = async (id: string) => {
    const isTeacherExist = await prisma.teacher.findUniqueOrThrow({
        where: { id }
    })

    if(isTeacherExist.isDeleted){
        throw new Error('Teacher already deleted');
    }

    const isUserExist = await prisma.user.findUniqueOrThrow({
        where: { email: isTeacherExist.email }
    })

    if(isUserExist.userStatus === UserStatus.DELETED){
        throw new Error('User already deleted');
    }

    if (isTeacherExist) {
       await prisma.$transaction(async (transactionClient) => {
            await transactionClient.teacher.update({
                where: { id: isTeacherExist.id },
                data: { isDeleted: true }
            })
            await transactionClient.user.updateMany({
                where: { email: isTeacherExist.email },
                data: { userStatus: UserStatus.DELETED }
            })
        })
    } return null;

}
export const TeacherService = {
    getAllTeacherFromDB,
    updateTeacherIntoDB,
    getSingleTeacherFromDB,
    deleteTeacherFromDB
}