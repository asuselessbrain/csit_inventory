'use client'

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@/types";
import { courseSchema } from "../createCourse/CreateCourseSchema";
import { toast } from "sonner";
import { BookOpen, Code, Layers } from "lucide-react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCourse } from "@/services/courseService";
import { useEffect } from "react";

export default function UpdateCourse({ course }: { course: Course | null }) {

    const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            courseCode: "",
            courseName: "",
            description: "",
            credits: "",
        },
    })

    const { formState: { isSubmitting } } = form

    useEffect(() => {
        if (course) {
            form.reset({
                courseCode: course.courseCode,
                courseName: course.courseName,
                description: course.description || "",
                credits: String(course.credits) ?? "",
            })
        }
    }, [course, form])

    if (!course) return null;



    const handleUpdate = async (data: FieldValues) => {

        const response = await updateCourse(course.id, data);

        if (response.success) {
            toast.success("Course updated successfully");
        }
        else {
            toast.error(response.errorMessage || "Failed to update course")
        }

    }

    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                    Update Course
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Modify course details and click save to update
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-6 py-4">
                {/* Course Code */}
                <div className="space-y-2">
                    <Controller
                        name="courseCode"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center gap-2">
                                    <Code className="h-4 w-4 text-indigo-600" />
                                    <FieldLabel htmlFor={field.name} className="font-semibold text-gray-700">
                                        Course Code
                                    </FieldLabel>
                                </div>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="e.g., CSE-101"
                                    autoComplete="off"
                                    value={field.value || ""}
                                    disabled
                                    className="bg-gray-50"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                <p className="text-xs text-gray-500">Course code cannot be modified</p>
                            </Field>
                        )}
                    />
                </div>

                {/* Course Name */}
                <div className="space-y-2">
                    <Controller
                        name="courseName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-blue-600" />
                                    <FieldLabel htmlFor={field.name} className="font-semibold text-gray-700">
                                        Course Name
                                    </FieldLabel>
                                </div>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="e.g., Programming Language Sessional"
                                    autoComplete="off"
                                    value={field.value || ""}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                {/* Credits */}
                <div className="space-y-2">
                    <Controller
                        name="credits"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center gap-2">
                                    <Layers className="h-4 w-4 text-green-600" />
                                    <FieldLabel htmlFor={field.name} className="font-semibold text-gray-700">
                                        Credits
                                    </FieldLabel>
                                </div>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="number"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="e.g., 3"
                                    step="0.25"
                                    min="0.5"
                                    max="4"
                                    value={field.value === undefined ? "" : String(field.value)}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                <p className="text-xs text-gray-500">Between 0.5 and 4 credits</p>
                            </Field>
                        )}
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="font-semibold text-gray-700">
                                    Description (Optional)
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Describe the course content and objectives..."
                                    rows={4}
                                    value={field.value || ""}
                                    className="resize-none"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                <p className="text-xs text-gray-500">
                                    {(field.value || "").length}/500 characters
                                </p>
                            </Field>
                        )}
                    />
                </div>

                <DialogFooter className="flex gap-3">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isSubmitting} className="cursor-pointer">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer disabled:cursor-no-drop"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
