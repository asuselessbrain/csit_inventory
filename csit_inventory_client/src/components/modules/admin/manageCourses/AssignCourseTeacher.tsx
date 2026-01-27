import { Button } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createCourseTeacher, getAssignedCourseTeacher } from "@/services/courseTeacherService"
import { getAllTeacherForCourseAssign } from "@/services/teacherService"
import { ICourse, ITeacher } from "@/types"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface AssignedTeacher {
    id: string
    courseId: string
    teacherId: string
    createdAt: string
    updatedAt: string
    teacher: ITeacher
}

export default function AssignCourseTeacher({ course }: { course: ICourse | null }) {
    const [teachers, setTeachers] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState<string>("")
    const [assignedTeachers, setAssignedTeachers] = useState<AssignedTeacher[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await getAllTeacherForCourseAssign()

            setTeachers(res?.data)
        }
        fetchTeachers()

        const assignedCourseTeacher = async () => {
            if (course) {
                const res = await getAssignedCourseTeacher(course.id)
                setAssignedTeachers(res?.data)
            }
        }
        assignedCourseTeacher()
    }, [course])

    const handleAssignTeacher = async () => {
        setIsLoading(true)
        if (!selectedTeacher || !course) {
            toast.warning("Please select a course teacher!", { id: "courseTeacher" })
            setIsLoading(false)
            return
        }
        const data = {
            courseId: course.id,
            teacherId: selectedTeacher
        }
        const res = await createCourseTeacher(data)

        if (res.success) {
            toast.success(res.message || "Course Teacher assign successful", { id: "courseTeacher" })
        }
        if (!res.success) {
            toast.error(res.errorMessage || "Failed to assign course teacher", { id: "courseTeacher" })
        }
        setIsLoading(false)
    }

    return (
        <DialogContent className="sm:max-w-125">
            <DialogHeader>
                <DialogTitle>Assign Teacher to Course</DialogTitle>
                <DialogDescription>
                    Select an instructor to assign to this course
                </DialogDescription>
            </DialogHeader>

            {course && (
                <div className="space-y-6 py-4">
                    {/* Course Code */}
                    <div className="grid gap-2">
                        <Label htmlFor="courseCode" className="font-semibold">
                            Course Code
                        </Label>
                        <Input
                            id="courseCode"
                            value={course.courseCode}
                            disabled
                            className="bg-gray-100"
                        />
                    </div>

                    {/* Course Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="courseName" className="font-semibold">
                            Course Name
                        </Label>
                        <Input
                            id="courseName"
                            value={course.courseName}
                            disabled
                            className="bg-gray-100"
                        />
                    </div>

                    {/* Assigned Teachers Section */}
                    {assignedTeachers.length > 0 && (
                        <div className="grid gap-2">
                            <Label className="font-semibold">Assigned Teachers</Label>
                            <div className="flex flex-wrap gap-2">
                                {assignedTeachers.map((item: AssignedTeacher) => (
                                    <Badge
                                        key={item.id}
                                        variant="secondary"
                                        className="px-3 py-2 text-sm font-medium gap-2"
                                    >
                                        {item.teacher.name}

                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Instructor Select Dropdown */}
                    <div className="grid gap-2">
                        <Label htmlFor="instructor" className="font-semibold">
                            Select Instructor
                        </Label>
                        <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                            <SelectTrigger id="instructor" disabled={isLoading} className="w-full">
                                <SelectValue placeholder="Choose an instructor..." />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers.map((teacher: ITeacher) => (
                                    <SelectItem key={teacher.id} value={teacher.id}>
                                        {`${teacher.name}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}

            <DialogFooter className="pt-4">
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button onClick={handleAssignTeacher} disabled={!selectedTeacher || isLoading}>
                        {isLoading ? "Assigning..." : "Assign Teacher"}
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}
