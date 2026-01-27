"use client"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createTask } from "@/services/taskService";
import { IProposal } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Upload, X, CheckCircle } from "lucide-react";

const taskSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must not exceed 100 characters"),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters"),
    dueDate: z
        .string()
        .min(1, "Due date is required"),
    requirements: z
        .array(z.string().min(1, "Requirement cannot be empty"))
        .min(1, "At least one requirement is required"),
    referenceMaterials: z
        .array(z.string().min(1, "Reference material cannot be empty"))
        .default([])
});

export default function AssignTask({ proposal, onSuccess }: { proposal: IProposal; onSuccess?: () => void }) {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadedMaterialUrls, setUploadedMaterialUrls] = useState<string[]>([]);

    const form = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: "",
            requirements: [""],
            referenceMaterials: []
        }
    });

    const { formState: { isSubmitting }, control, setValue } = form;

    const requirements = useWatch({ control, name: "requirements" });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploadError(null);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setUploadError(`${file.name} exceeds 5MB limit`);
                continue;
            }

            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                setUploadError(`${file.name} has unsupported file type`);
                continue;
            }

            setUploadedFiles((prev) => [...prev, file]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleTaskSubmit = async (data: FieldValues) => {
        // Upload files to Cloudinary if any
        const materialUrls = [...uploadedMaterialUrls];

        if (uploadedFiles.length > 0) {
            for (const file of uploadedFiles) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "my_preset");
                formData.append("resource_type", "auto");

                try {
                    const res = await fetch(
                        'https://api.cloudinary.com/v1_1/dwduymu1l/auto/upload',
                        { method: "POST", body: formData }
                    );

                    const uploadedData = await res.json();
                    materialUrls.push(uploadedData.secure_url);
                } catch (error) {
                    toast.error(`Failed to upload ${file.name}`);
                    return;
                }
            }
        }

        data.dueDate = new Date(data.dueDate)

        const payload = {
            ...data,
            projectThesisId: proposal.id,
            requirements: (data.requirements as string[]).filter((r: string) => r.trim() !== ""),
            referenceMaterials: materialUrls
        };

        const res = await createTask(payload);

        console.log(res)

        if (res.success) {
            toast.success(res.message || "Task assigned successfully");
            form.reset();
            setUploadedFiles([]);
            setUploadedMaterialUrls([]);
            onSuccess?.();
        } else {
            toast.error(res.errorMessage || "Failed to assign task");
        }
    };

    const addRequirement = () => {
        setValue("requirements", [...requirements, ""]);
    };

    const removeRequirement = (index: number) => {
        const updated = requirements.filter((_, i) => i !== index);
        setValue("requirements", updated.length > 0 ? updated : [""]);
    };

    return (
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                    Assign Task
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                    Create a new task for the proposal: <strong>{proposal.projectTitle}</strong>
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(handleTaskSubmit)} className="p-6 sm:p-8 space-y-6">
                {/* Title */}
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Task Title <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter task title"
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
                                Description <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Textarea
                                rows={6}
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter detailed task description"
                                value={field.value || ""}
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Due Date */}
                <Controller
                    name="dueDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Due Date <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Input
                                type="datetime-local"
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Requirements */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <FieldLabel>
                            Requirements <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={addRequirement}
                            className="gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Add Requirement
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {requirements.map((_, index) => (
                            <Controller
                                key={index}
                                name={`requirements.${index}`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="flex gap-2">
                                        <Input
                                            {...field}
                                            placeholder={`Requirement ${index + 1}`}
                                            value={field.value || ""}
                                            autoComplete="off"
                                            className="flex-1"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {requirements.length > 1 && (
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => removeRequirement(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                    {form.formState.errors.requirements && (
                        <FieldError errors={[form.formState.errors.requirements]} />
                    )}
                </div>

                {/* Reference Materials - File Upload */}
                <div className="space-y-3">
                    <FieldLabel>Reference Materials (PDF, DOC, DOCX, Image)</FieldLabel>

                    {/* File Upload Area */}
                    <label htmlFor="reference-file-upload">
                        <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-8 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            <Upload className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500 mb-3" />
                            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                                Upload reference materials
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB each)
                            </p>
                            <Input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                                id="reference-file-upload"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                            <label htmlFor="reference-file-upload" className="cursor-pointer">
                                <div className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose Files
                                </div>
                            </label>
                        </div>
                    </label>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">{file.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="p-1 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
                                    >
                                        <X className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Upload Error */}
                    {uploadError && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-700 dark:text-red-300">{uploadError}</p>
                        </div>
                    )}

                    {/* Uploaded Material URLs */}
                    {uploadedMaterialUrls.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Uploaded materials:</p>
                            {uploadedMaterialUrls.map((url, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Material {index + 1}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{url}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUploadedMaterialUrls((prev) => prev.filter((_, i) => i !== index));
                                        }}
                                        className="p-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition-colors"
                                    >
                                        <X className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

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
                                Assigning...
                            </>
                        ) : (
                            "Assign Task"
                        )}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}
