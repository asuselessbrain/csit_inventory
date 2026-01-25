"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { proposalSchema } from "./SubmitProposalSchema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploder";

export default function SubmitProposalForm() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(proposalSchema)
    });

    const { formState: { isSubmitting } } = form

    const onSubmit = async (data: FieldValues) => {
        console.log(data)
        // try {
        //     // Simulate API call
        //     await new Promise((resolve) => setTimeout(resolve, 2000));
        //     console.log('Form submitted:', data, 'Files:', uploadedFiles);
        //     reset();
        //     setUploadedFiles([]);
        // } catch (error) {
        //     console.error('Submission failed:', error);
        // }
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

            {/* Attachments */}
            <FileUploader uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} uploadError={uploadError} setUploadError={setUploadError} />
            {/* Form Actions */}
            <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
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
        </form>
    )
}
