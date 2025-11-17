import { Prisma } from "../../generated/prisma"

export const searching = (inputFilter: Prisma.StudentWhereInput[], searchFields: string[], searchTerm: string) => {
    return inputFilter.push({
            OR: searchFields.map(field => ({ [field]: { contains: String(searchTerm), mode: 'insensitive' } })
            )
        })
}