"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { courseSchema } from "./CreateCourseSchema";
import { createCourse } from "@/services/courseService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateCourseForm() {
    const form = useForm({
        resolver: zodResolver(courseSchema),
    });
    const { formState: { isSubmitting } } = form
    const router = useRouter()

    const courseId = "create-course-toast";

    const onSubmit = async (data: FieldValues) => {
        const res = await createCourse(data)
        if (res.success) {
            toast.success(res.data.message || "Course Created Successfully!", { id: courseId })
            router.push('/admin/manage-courses')
        }
        if (!res.success) {
            toast.error(res.errorMessage || "Course Creation Failed!", { id: courseId })
        }
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
            {/* Course Code */}
            <Controller
                name="courseCode"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Course Code <span className="text-red-500">*</span></FieldLabel>
                        <Input
                            type="text"
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g., CCE-301, CSIT-405"
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Course Name */}
            <Controller
                name="courseName"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Course Name <span className="text-red-500">*</span></FieldLabel>
                        <Input
                            type="text"
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g., Data Structures and Algorithms"
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Description */}
            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Description</FieldLabel>
                        <Textarea
                            rows={3}
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter a brief description of the course content and objectives"
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Credits */}
            <Controller
                name="credits"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Credits <span className="text-red-500">*</span></FieldLabel>
                        <Input
                            type="number"
                            step="0.25"
                            min="0.5"
                            max="4"
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g., 3"
                            value={field.value === undefined ? "" : String(field.value)}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            {/* Form Actions */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className='w-full'
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Course...
                    </span>
                ) : (
                    'Add Course'
                )}
            </Button>
        </form>
    )
}
