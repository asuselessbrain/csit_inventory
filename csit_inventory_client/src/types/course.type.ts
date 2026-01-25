export interface Course {
    id: string
    courseCode: string
    courseName: string
    description: string | null
    credits: number
    status: 'ACTIVE' | 'INACTIVE'
    createdAt: string
    updatedAt: string
}