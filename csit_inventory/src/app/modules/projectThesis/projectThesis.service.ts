import { prisma } from "../../../shared/prisma";


const createProjectThesisIntoDB = async (projectThesisInfo: any) => {

    const result = await prisma.projectAndThesis.create({ data: projectThesisInfo });
    
    return result
}

export const ProjectThesisService = {
    createProjectThesisIntoDB
}