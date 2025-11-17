import { UserRole } from '../../../../generated/prisma';
import { prisma } from '../../../shared/prisma';

const createStudentIntoDB = async (studentInfo: any) => {

    const userData = {
        email: studentInfo.email,
        password: studentInfo.password,
        role: UserRole.STUDENT
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.create({ data: userData });
        const student = await transactionClient.student.create({ data: studentInfo.student });

        return student
    })

    return result
}

export const UserService = {
    createStudentIntoDB
}