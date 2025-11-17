import { Prisma } from "../../generated/prisma"

export const filtering = (inputFilter: Prisma.StudentWhereInput[], filterData: Record<string, any>) => {
    return inputFilter.push({
            AND: Object.keys(filterData).map((item: string) => ({ [item]: { equals: filterData[item] } }))
        })
}