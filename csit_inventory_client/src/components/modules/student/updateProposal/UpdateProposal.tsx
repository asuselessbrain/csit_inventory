"use client"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateProposal } from "@/services/proposalService";
import { IProposal, ICourse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploder";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCourseForProjectThesis } from "@/services/courseService";
import { getAssignedCourseTeacher } from "@/services/courseTeacherService";
import z from "zod";

const updateProposalSchema = z.object({
    courseId: z.string().min(1, "Course is required").optional().default(""),
    supervisorId: z.string().min(1, "Supervisor is required").optional().default(""),
    type: z.enum(["PROJECT", "THESIS"]).optional().default("PROJECT"),
    projectTitle: z
        .string()
        .min(5, "Project title must be at least 5 characters")
        .max(100, "Project title must not exceed 100 characters"),
    abstract: z
        .string()
        .min(50, "Abstract must be at least 50 characters"),
    projectObjectives: z
        .string()
        .min(20, "Objectives are required"),
    methodology: z
        .string()
        .min(20, "Methodology description is required"),
    expectedOutcomes: z
        .string()
        .min(20, "Expected outcomes are required"),
    technologiesTools: z
        .string()
        .min(5, "Technologies/tools are required"),
    estimatedTimeline: z
        .string()
        .min(5, "Timeline is required")
});

export default function UpdateProposal({ proposal, onSuccess }: { proposal: IProposal; onSuccess?: () => void }) {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [supervisors, setSupervisors] = useState([]);

    const form = useForm({
        resolver: zodResolver(updateProposalSchema),
        defaultValues: {
            projectTitle: proposal.projectTitle,
            abstract: proposal.abstract,
            projectObjectives: proposal.projectObjectives,
            methodology: proposal.methodology,
            expectedOutcomes: proposal.expectedOutcomes,
            technologiesTools: Array.isArray(proposal.technologiesTools)
                ? proposal.technologiesTools.join(", ")
                : proposal.technologiesTools,
            estimatedTimeline: proposal.estimatedTimeline,
            type: proposal.type,
            courseId: proposal.courseId,
            supervisorId: proposal.supervisorId
        }
    });

    const { formState: { isSubmitting }, control } = form;

    const selectedCourse = useWatch({ control, name: "courseId" });

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await getCourseForProjectThesis();
            setCourses(res?.data || []);
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchTeachers = async () => {
            if (selectedCourse) {
                const res = await getAssignedCourseTeacher(selectedCourse);
                setSupervisors(res?.data || []);
            }
        };
        fetchTeachers();
    }, [selectedCourse]);

    const handleUpdate = async (data: FieldValues) => {
        const attachments: string[] = [...(proposal.attachments || [])];

        // Upload new files if any
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

                const uploadedData = await res.json();
                attachments.push(uploadedData.secure_url);
            }
        }

        const updateData = {
            ...data,
            attachments,
            technologiesTools: data.technologiesTools.split(",").map((t: string) => t.trim())
        };

        console.log(updateData)

        const response = await updateProposal(proposal.id, updateData);
        console.log(response)

        if (response.success) {
            toast.success("Proposal updated successfully");
            onSuccess?.();
        } else {
            toast.error(response.errorMessage || "Failed to update proposal");
        }
    };

    return (
        <DialogContent className="max-w-xl max-h-screen overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                    Update Proposal
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Modify proposal details and click save to update
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(handleUpdate)} className="p-6 sm:p-8 space-y-6">
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

                    {/* Type */}
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
                                                {p}
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

                    {/* Supervisor */}
                    <Controller
                        name="supervisorId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Supervisor <span className="text-red-500">*</span></FieldLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                    disabled={!selectedCourse || supervisors.length === 0}
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
                            {isSubmitting ? "Updating..." : "Update Proposal"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
