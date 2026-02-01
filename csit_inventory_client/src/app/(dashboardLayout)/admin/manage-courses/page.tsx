import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCourses } from '@/services/courseService'
import ManageCoursesTable from '@/components/modules/admin/manageCourses/ManageCoursesTable'
import { ICourse } from '@/types'

export default async function ManageCoursePage({ searchParams }: {
  searchParams: Promise<{
    page?: string
    search?: string
    semester?: string
    sortBy?: string
    status?: string
    sortOrder?: "asc" | "desc"
  }>
}) {

  const params = await searchParams;

  const page = Number(params.page ?? 1)
  const limit = 10

  const queryParams = {
    skip: (page - 1),
    searchTerm: params.search,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    semester: params.semester,
    status: params.status,
    take: limit
  }
  const response = await getCourses(queryParams)

  const courses = response?.data || []
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Course Management
            </h1>
            <p className="mt-1 text-gray-600">
              Manage and organize all courses in your system
            </p>
          </div>
          <Link href="/admin/add-course">
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4 text-white" />
              Create Course
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        {/* <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Total Courses</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{courses?.data.length}</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Active Courses</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {courses?.data.filter((c: ICourse) => c.status === 'ACTIVE').length}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Total Credits</p>
            <p className="mt-2 text-2xl font-bold text-blue-600">
              {courses?.data.reduce((sum: number, c: ICourse) => sum + (c.credits || 0), 0)}
            </p>
          </div>
        </div> */}
        <ManageCoursesTable courses={courses} />
      </div>
    </div>
  )
}