'use client'

import { useState } from 'react'
import { Trash2, Eye, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { Course, Meta } from '@/types'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import ViewCourseDetails from './ViewCourseDetails'
import { getSingleCourse } from '@/services/courseService'



interface ManageCoursesTableProps {
    courses: {
        meta: Meta,
        data: Course[]
    }
}

export default function ManageCoursesTable({ courses }: ManageCoursesTableProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [course, setCourse] = useState<Course | null>(null)

    // const handleDelete = async () => {
    //     if (!deleteId) return

    //     setIsDeleting(true)
    //     try {
    //         // Implement delete API call here
    //         const response = await fetch(`/api/courses/${deleteId}`, {
    //             method: 'DELETE',
    //         })

    //         if (response.ok) {
    //             toast.success('Course deleted successfully')
    //             // Revalidate or refetch courses
    //         } else {
    //             toast.error('Failed to delete course')
    //         }
    //     } catch (error) {
    //         toast.error(error?.errorMessage ||'Error deleting course')
    //     } finally {
    //         setIsDeleting(false)
    //         setDeleteId(null)
    //     }
    // }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
            case 'ARCHIVED':
                return 'bg-red-100 text-red-800 hover:bg-red-100'
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
        }
    }

    const viewCourseDetails = async (courseId: string) => {
        const course = await getSingleCourse(courseId)
        if (course?.success) {
            setCourse(course?.data)
        }
    }

    return (
        <>
            <div className="rounded-lg border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b bg-gray-50 hover:bg-gray-50">
                            <TableHead className="font-semibold text-gray-700">Course Code</TableHead>
                            <TableHead className="font-semibold text-gray-700">Course Title</TableHead>
                            <TableHead className="font-semibold text-gray-700">Credits</TableHead>
                            <TableHead className="font-semibold text-gray-700">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses?.data && courses?.data.length > 0 ? (
                            courses?.data.map((course) => (
                                <TableRow
                                    key={course.id}
                                    className="border-b transition-colors hover:bg-gray-50"
                                >
                                    <TableCell className="font-medium text-gray-900">
                                        {course.courseCode}
                                    </TableCell>
                                    <TableCell className="text-gray-700">{course.courseName}</TableCell>
                                    <TableCell className="text-gray-700">{course.credits}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${getStatusColor(course.status)} border-0 font-medium`}
                                        >
                                            {course.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        onClick={() => viewCourseDetails(course.id)}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                                                        title="View course details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                </DialogTrigger>
                                                <ViewCourseDetails course={course} />
                                            </Dialog>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                title="Edit course"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                onClick={() => setDeleteId(course.id)}
                                                title="Delete course"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="py-8 text-center">
                                    <div className="text-gray-500">
                                        <p className="text-lg font-medium">No courses found</p>
                                        <p className="text-sm">Create your first course to get started</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Course</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this course? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-3">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            // onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
