export const pagination = (skip: number = 0, take?: number, sortBy?: string, sortOrder?: 'asc' | 'desc') => {
    const currentPage = skip ? skip + 1 : 1;
    const takeValue = take || 10;
    const skipValue = skip * takeValue || 0;
    const sortByField = sortBy || 'createdAt';
    const sortOrderValue = sortOrder || 'desc'

    return {
        currentPage,
        skipValue,
        takeValue,
        sortByField,
        sortOrderValue
    }
}