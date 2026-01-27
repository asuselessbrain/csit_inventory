"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";
import { proposalSchema } from "./SubmitProposalSchema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploder";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCourseForProjectThesis } from "@/services/courseService";
import { ICourse } from "@/types";
import { getAssignedCourseTeacher } from "@/services/courseTeacherService";
import { createProjectThesis } from "@/services/proposalService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SubmitProposalForm() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(proposalSchema)
    });

    const { formState: { isSubmitting }, control } = form

    const selectedCourse = useWatch({ control, name: "courseId" })

    const [courses, setCourses] = useState([])
    const [supervisors, setSupervisors] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await getCourseForProjectThesis()

            setCourses(res?.data)
        }
        fetchCourses()
    }, [])

    useEffect(() => {
        const fetchTeachers = async () => {
            if (selectedCourse) {
                const res = await getAssignedCourseTeacher(selectedCourse)
                setSupervisors(res?.data)
            }
        }
        fetchTeachers()
    }, [selectedCourse])

    const onSubmit = async (data: FieldValues) => {

        const attachments: string[] = [];

        if (uploadedFiles.length) {
            for (const file of uploadedFiles) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "my_preset");
                formData.append("resource_type", "auto");

                const res = await fetch(
                    'https://api.cloudinary.com/v1_1/dwduymu1l/auto/upload',
                    { method: "POST", body: formData }
                );

                const data = await res.json();
                attachments.push(data.secure_url);
            }
        }

        data.attachments = attachments

        data.technologiesTools = data.technologiesTools.split(",")
        const toastId = "projectThesis";

        const res = await createProjectThesis(data)

        if (res.success) {
            toast.success(res.message, { id: toastId });
            router.push(`/student/my-proposals`)
        }

        if (!res.success) {
            toast.error(res.errorMessage || "Login Failed Due to Unknown Error", { id: toastId })
        }
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
            {/* Project Title */}
            <Controller
                name="projectTitle"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Project Title <span className="text-red-500">*</span></FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter your project title"
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Abstract */}
            <Controller
                name="abstract"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Abstract <span className="text-red-500">*</span></FieldLabel>
                        <Textarea
                            rows={8}
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Provide a brief summary of your project (200-300 words)"
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Project Objectives */}
            <Controller
                name="projectObjectives"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Project Objectives <span className="text-red-500">*</span></FieldLabel>
                        <Textarea
                            rows={8}
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="List the main objectives of your project (one per line)"
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Methodology */}
            <Controller
                name="methodology"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Methodology <span className="text-red-500">*</span></FieldLabel>
                        <Textarea
                            rows={8}
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Describe your approach and methods for completing this project"
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Expected Outcomes */}
            <Controller
                name="expectedOutcomes"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Expected Outcomes <span className="text-red-500">*</span></FieldLabel>
                        <Textarea
                            rows={8}
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="What results or deliverables do you expect from this project?"
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Technologies & Tools */}
            <Controller
                name="technologiesTools"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Technologies & Tools <span className="text-red-500">*</span></FieldLabel>
                        <Input
                            type="text"
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g., React, Node.js, MongoDB, TensorFlow, etc."
                            value={field.value || ""}
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Estimated Timeline */}
                <Controller
                    name="estimatedTimeline"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Estimated Timeline <span className="text-red-500">*</span></FieldLabel>
                            <Input
                                type="text"
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="e.g., 6 months, 1 semester, etc."
                                value={field.value || ""}
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                {/* types */}
                <Controller
                    name="type"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Type <span className="text-red-500">*</span></FieldLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["PROJECT", "THESIS"].map((p: string) => (
                                        <SelectItem key={p} value={p}>
                                            {`${p}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Course */}
                <Controller
                    name="courseId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Course <span className="text-red-500">*</span></FieldLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course: ICourse) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {`${course.courseCode} - ${course.courseName}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                {/* supervisor */}
                <Controller
                    name="supervisorId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Supervisor <span className="text-red-500">*</span></FieldLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                disabled={!selectedCourse || supervisors.length === 0} // disable if no course or no supervisor
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Supervisor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {supervisors.length > 0 ? (
                                        supervisors.map((supervisor: { teacherId: string; teacher: { name: string } }) => (
                                            <SelectItem key={supervisor.teacherId} value={supervisor.teacherId}>
                                                {supervisor.teacher.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="none" disabled>
                                            No Supervisor Found
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

            </div>
            {/* Attachments */}
            <FileUploader uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} uploadError={uploadError} setUploadError={setUploadError} />
            {/* Form Actions */}
            <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 cursor-pointer disabled:cursor-no-drop"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        "Submit Proposal"
                    )}
                </Button>
            </div>
        </form >
    )
}
