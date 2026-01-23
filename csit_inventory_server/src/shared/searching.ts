import { Prisma } from "../../generated/prisma/client"

export const searching = (inputFilter: Prisma.StudentWhereInput[] | Prisma.AdminWhereInput[] | Prisma.TeacherWhereInput[] | Prisma.CoursesWhereInput[], searchFields: string[], searchTerm: string) => {
    return inputFilter.push({
            OR: searchFields.map(field => ({ [field]: { contains: String(searchTerm), mode: 'insensitive' } })
            )
        })
}