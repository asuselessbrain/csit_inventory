import { pagination } from './../../../shared/pagination';
import { CONNREFUSED } from "dns"
import { prisma } from "../../../shared/prisma"

const createProjectThesisIntoDB = async (projectThesisInfo: any) => {

    const result = await prisma.projectThesis.create({
        data: projectThesisInfo
    })

    return result
}



export const ProjectThesisService = {
    createProjectThesisIntoDB,
    getAllProjectThesesFromDB
}
