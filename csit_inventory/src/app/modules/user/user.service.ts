import { UserRole } from '../../../../generated/prisma';
import { config } from '../../../config';
import { prisma } from '../../../shared/prisma';
import bcrypt from 'bcrypt';

const createStudentIntoDB = async (studentInfo: any) => {

    const hashedPassword = await bcrypt.hash(studentInfo.password, Number(config.salt_rounds))

    const userData = {
        email: studentInfo.email,
        password: hashedPassword,
        role: UserRole.STUDENT
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.create({ data: userData });
        const student = await transactionClient.student.create({ data: studentInfo.student });

        return student
    })

    return result
}

const createAdminIntoDB = async(adminInfo:any) => {
    const hashedPassword = await bcrypt.hash(adminInfo.password, Number(config.salt_rounds))
    const userData = {
        email: adminInfo.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }
    const result = await prisma.$transaction(async(transactionClient)=>{
        await transactionClient.user.create({
            data: userData
        })
        const createAdmin = await transactionClient.admin.create({
            data: adminInfo.admin
        })
        return createAdmin;
    })
    return result;
}

export const UserService = {
    createStudentIntoDB,
    createAdminIntoDB
}