"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teacherSchema } from "./AddTeacherSchema";
import { addTeacher } from "@/services/teacherService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

export default function AddTeacherForm() {
    const form = useForm({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            faculty: "Computer Science and Engineering"
        }
    })

    const { formState: { isSubmitting } } = form

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date("2026-06-01"))
    const [month, setMonth] = useState<Date | undefined>(date)

    const handleCreateAccount = async (data: FieldValues) => {

        const teacherData = {
            email: data.email,
            password: data.password,
            teacher: {
                email: data.email,
                name: data.name,
                phoneNumber: data.phoneNumber,
                address: data.address,
                // photoUrl: "https://example.com/photos/rahim.png",
                faculty: data.faculty,
                department: data.department,
                designation: data.designation,
                joinedAt: new Date(data.joinedAt).toISOString()
            }
        }

        const res = await addTeacher(teacherData)

        if (res.success) {
            router.push("/admin/manage-teachers")
            toast.success(res.message || "Teacher account created successfully")
        }
        if (!res.success) {
            toast.error(res.errorMessage || "Failed to create teacher account")
        }
    }
    return (
        <form
            onSubmit={form.handleSubmit(handleCreateAccount)}
            className="space-y-6"
        >
            {/* Login Details Section */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* email */}
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="you@example.com"
                                    autoComplete="off"
                                    type="email"
                                    value={field.value || ""}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* password */}
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Create a strong password"
                                    autoComplete="off"
                                    type="password"
                                    value={field.value || ""}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-medium">
                        Teacher Information
                    </span>
                </div>
            </div>

            {/* Teacher Information Section */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* teacher name */}
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your full name"
                                    autoComplete="off"
                                    type="text"
                                    value={field.value || ""}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    {/* phone number */}
                    <Controller
                        name="phoneNumber"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your phone number"
                                    autoComplete="off"
                                    type="text"
                                    value={field.value || ""}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
                {/* Address */}
                <Controller
                    name="address"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                            <Textarea
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your residential address"
                                autoComplete="off"
                                value={field.value || ""}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Faculty */}
                    <Controller
                        name="faculty"
                        control={form.control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Faculty</FieldLabel>
                                <Input
                                    {...field}
                                    value="Computer Science and Engineering"
                                    disabled
                                />
                            </Field>
                        )}
                    />
                    {/* department */}
                    <Controller
                        name="department"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Department</FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Computer_Science_And_Information_Technology">Computer Science and Information Technology</SelectItem>
                                        <SelectItem value="Computer_science_And_Communication_Engineering">Computer Science and Communication Engineering</SelectItem>
                                        <SelectItem value="Electrical_And_Electronic_Engineering">Electrical and Electronic Engineering</SelectItem>
                                        <SelectItem value="Physics_And_Mechanical_Engineering">Physics and Mechanical Engineering</SelectItem>
                                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* joined at */}
                    <Controller
                        name="joinedAt"
                        control={form.control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="date-required">Joined At</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        id="date-required"
                                        placeholder="June 01, 2025"
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "ArrowDown") {
                                                e.preventDefault()
                                                setOpen(true)
                                            }
                                        }}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <InputGroupButton
                                                    id="date-picker"
                                                    variant="ghost"
                                                    size="icon-xs"
                                                    aria-label="Select date"
                                                >
                                                    <CalendarIcon />
                                                    <span className="sr-only">Select date</span>
                                                </InputGroupButton>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto overflow-hidden p-0"
                                                align="end"
                                                alignOffset={-8}
                                                sideOffset={10}
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    month={month}
                                                    onMonthChange={setMonth}
                                                    onSelect={(selectedDate) => {
                                                        if (!selectedDate) return
                                                        setDate(selectedDate)
                                                        setMonth(selectedDate)
                                                        // Update form value with formatted string
                                                        field.onChange(formatDate(selectedDate))
                                                        setOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* Designation */}
                    <Controller
                        name="designation"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Designation</FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Designation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LECTURER">Lecturer</SelectItem>
                                        <SelectItem value="ASSISTANT_PROFESSOR">Assistant Professor</SelectItem>
                                        <SelectItem value="ASSOCIATE_PROFESSOR">Associate Professor</SelectItem>
                                        <SelectItem value="PROFESSOR">Professor</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                </div>
                {/* profile image */}
                <Controller
                    name="profilePhoto"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Profile Photo</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your"
                                autoComplete="off"
                                type="file"
                                value={field.value || ""}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>

            {/* Submit Button */}
            <Button disabled={isSubmitting} type="submit" className="w-full cursor-pointer disabled:cursor-no-drop">{isSubmitting ? "Creating..." : "Create Account"}</Button>
        </form>
    )
}
