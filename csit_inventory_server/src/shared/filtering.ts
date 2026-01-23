import { Prisma } from "../../generated/prisma/client"

export const filtering = (inputFilter: Prisma.StudentWhereInput[] | Prisma.AdminWhereInput[] | Prisma.TeacherWhereInput[] | Prisma.CoursesWhereInput[], filterData: Record<string, any>) => {
    return inputFilter.push({
            AND: Object.keys(filterData).map((item: string) => ({ [item]: { equals: filterData[item] } }))
        })
}