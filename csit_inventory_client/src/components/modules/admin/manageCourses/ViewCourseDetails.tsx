'use client'

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Layers, Calendar } from "lucide-react";
import { format } from 'date-fns';

export default function ViewCourseDetails({ course }: { course: Course | null }) {
    if (!course) return null;

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

    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                    Course Details
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Complete information about the course
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
                {/* Course Header */}
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                <h3 className="text-sm font-medium text-gray-600">Course Code</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{course.courseCode}</p>
                        </div>
                        <Badge className={`${getStatusColor(course.status)} border-0 font-medium h-fit`}>
                            {course.status}
                        </Badge>
                    </div>
                </div>

                {/* Course Name */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-indigo-600" />
                        <label className="text-sm font-semibold text-gray-700">Course Name</label>
                    </div>
                    <p className="text-lg font-medium text-gray-900 px-6">{course.courseName}</p>
                </div>

                {/* Credits */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-blue-600" />
                        <label className="text-sm font-semibold text-gray-700">Credits</label>
                    </div>
                    <div className="px-6">
                        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                            <span className="text-xl font-bold text-blue-900">{course.credits}</span>
                            <span className="text-sm text-blue-700">credit hours</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {course.description && (
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-gray-700 leading-relaxed text-sm">
                                {course.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-xs font-medium text-gray-600">Created</span>
                        </div>
                        <p className="text-sm text-gray-900 px-6">
                            {format(new Date(course.createdAt), 'MMM dd, yyyy')}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-xs font-medium text-gray-600">Last Updated</span>
                        </div>
                        <p className="text-sm text-gray-900 px-6">
                            {format(new Date(course.updatedAt), 'MMM dd, yyyy')}
                        </p>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}
