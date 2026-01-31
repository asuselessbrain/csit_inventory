"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateStudentDetails } from "@/services/stuentService";
import { IStudent } from "@/types";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateStudent({ student }: { student: IStudent }) {
  const form = useForm({
    defaultValues: {
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address,
      collageName: student.collageName,
      schoolName: student.schoolName,
      registrationNumber: student.registrationNumber,
      studentId: student.studentId,
      semester: student.semester,
      session: student.session,
      dateOfBirth: student.dateOfBirth?.slice?.(0, 10),
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const toastId = "update-student-details";

  const handleUpdate = async (data: FieldValues) => {
    const payload = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      collageName: data.collageName,
      schoolName: data.schoolName,
      semester: data.semester,
      session: data.session,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
    };

    const res = await updateStudentDetails(student.id, payload);

    if (res.success) {
      toast.success(res.message || "Student details updated successfully", {
        id: toastId,
      });
    } else {
      toast.error(res.errorMessage || "Failed to update student details", {
        id: toastId,
      });
    }
  };
  if (isSubmitting) {
    toast.loading("Updating student details...", { id: toastId });
  }
  return (
    <DialogContent className="max-w-4xl max-h-9/10 overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-900">
          Update Student
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Modify student details and click save to update
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className="space-y-6 py-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-semibold text-gray-700"
                    >
                      Full Name
                    </FieldLabel>
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., John Doe"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-semibold text-gray-700"
                    >
                      Email
                    </FieldLabel>
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., student@example.com"
                    autoComplete="off"
                    disabled
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-purple-600" />
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-semibold text-gray-700"
                    >
                      Phone
                    </FieldLabel>
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., 017XXXXXXXX"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* College Name */}
          <div className="space-y-2">
            <Controller
              name="collageName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-semibold text-gray-700"
                  >
                    College Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., Dhaka College"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* School Name */}
          <div className="space-y-2">
            <Controller
              name="schoolName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-semibold text-gray-700"
                  >
                    School Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., Dhaka High School"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Registration Number */}
          <div className="space-y-2">
            <Controller
              name="registrationNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-semibold text-gray-700"
                  >
                    Registration Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., 09557"
                    autoComplete="off"
                    value={field.value || ""}
                    disabled
                    className="bg-gray-50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Student ID */}
          <div className="space-y-2">
            <Controller
              name="studentId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-semibold text-gray-700"
                  >
                    Student ID
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., 2002040"
                    autoComplete="off"
                    value={field.value || ""}
                    disabled
                    className="bg-gray-50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Semester */}
          <div className="space-y-2">
            <Controller
              name="semester"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Semester <span className="text-red-500">*</span>
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Semester</SelectLabel>

                        <SelectItem value="FIRST">1st Semester</SelectItem>
                        <SelectItem value="SECOND">2nd Semester</SelectItem>
                        <SelectItem value="THIRD">3rd Semester</SelectItem>
                        <SelectItem value="FOURTH">4th Semester</SelectItem>
                        <SelectItem value="FIFTH">5th Semester</SelectItem>
                        <SelectItem value="SIXTH">6th Semester</SelectItem>
                        <SelectItem value="SEVENTH">7th Semester</SelectItem>
                        <SelectItem value="EIGHTH">8th Semester</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Session */}
          <div className="space-y-2">
            <Controller
              name="session"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-semibold text-gray-700"
                  >
                    Session
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., 2020-2021"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Controller
              name="dateOfBirth"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-semibold text-gray-700"
                  >
                    Date of Birth
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="date"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
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

        {/* Address */}
        <div className="space-y-2">
          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-semibold text-gray-700"
                  >
                    Address
                  </FieldLabel>
                </div>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Student address..."
                  rows={3}
                  value={field.value || ""}
                  className="resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
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
