"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { registrationSchema } from "./RegistrationValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudentAccount } from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toastId } from "@/components/shared/toastId";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function RegistrationForm() {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("2026-06-01"));
  const [month, setMonth] = useState<Date | undefined>(date);

  const handleCreateAccount = async (data: FieldValues) => {
    if (data.profilePhoto) {
      const formData = new FormData();
      formData.append("file", data.profilePhoto);
      formData.append("upload_preset", "my_preset");
      formData.append("resource_type", "auto");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwduymu1l/auto/upload",
        { method: "POST", body: formData },
      );

      const imageData = await res.json();

      data.profilePhoto = imageData.secure_url;
    }

    const payload = {
      email: data.email,
      password: data.password,
      student: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        studentId: data.studentId,
        registrationNumber: data.registrationNumber,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        profilePhoto: data.profilePhoto,
        session: data.session,
        schoolName: data.schoolName,
        collageName: data.collageName,
      },
    };

    const res = await createStudentAccount(payload);
    if (res.success) {
      toast.success(
        res.message ||
          "Account created successfully. Please check your email for email verification.",
        { id: toastId },
      );
      router.push("/login");
      form.reset();
    } else {
      toast.error(res.errorMessage || "Failed to create account", {
        id: toastId,
      });
      form.reset();
    }
  };

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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
            Student Information
          </span>
        </div>
      </div>

      {/* Student Information Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* student name */}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
          {/* Student ID */}
          <Controller
            name="studentId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Student ID</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your student ID"
                  autoComplete="off"
                  type="text"
                  value={field.value || ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Registration No */}
          <Controller
            name="registrationNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Registration No</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your registration number"
                  autoComplete="off"
                  type="text"
                  value={field.value || ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* date of birth */}
          <Controller
            name="dateOfBirth"
            control={form.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="date-required">Date of Birth</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    placeholder="June 01, 2025"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
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
                            if (!selectedDate) return;
                            setDate(selectedDate);
                            setMonth(selectedDate);
                            // Update form value with formatted string
                            field.onChange(formatDate(selectedDate));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* profile image */}
          <Controller
            name="profilePhoto"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Profile Photo</FieldLabel>
                <Input
                  id={field.name}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* session */}
          <Controller
            name="session"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Session</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g., 2021-2022"
                  autoComplete="off"
                  type="text"
                  value={field.value || ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* school name */}
          <Controller
            name="schoolName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>School Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Your school name"
                  autoComplete="off"
                  type="text"
                  value={field.value || ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="collageName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>College Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Your college name"
                autoComplete="off"
                type="text"
                value={field.value || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full cursor-pointer disabled:cursor-no-drop"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
