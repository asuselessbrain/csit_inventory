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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTeacher } from "@/services/teacherService";
import { ITeacher } from "@/types";
import { Mail, Phone, MapPin, Building2, Briefcase, User } from "lucide-react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { toastId } from "@/components/shared/toastId";

export default function UpdateTeacher({ teacher }: { teacher: ITeacher }) {
  const form = useForm({
    defaultValues: {
      name: teacher.name,
      email: teacher.email,
      phoneNumber: teacher.phoneNumber,
      address: teacher.address,
      designation: teacher.designation,
      department: teacher.department,
      faculty: teacher.faculty,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleUpdateTeacher = async (data: FieldValues) => {
    const res = await updateTeacher(teacher.id, data);

    if (res.success) {
      toast.success(res.message || "Teacher updated successfully", {
        id: toastId,
      });
    } else {
      toast.error(res.errorMessage || "Failed to update teacher", {
        id: toastId,
      });
    }
  };

  if (isSubmitting) {
    toast.loading("Updating teacher details...", { id: toastId });
  }

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-900">
          Update Teacher
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Modify teacher details and click save to update
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(handleUpdateTeacher)}
        className="space-y-6 py-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold text-gray-700">
                  Full Name
                </FieldLabel>
                <Input {...field} value={field.value || ""} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold text-gray-700">
                  Email
                </FieldLabel>
                <Input {...field} disabled value={field.value || ""} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold text-gray-700">
                  Phone
                </FieldLabel>
                <Input {...field} value={field.value || ""} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Faculty */}
          <Controller
            name="faculty"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold text-gray-700">
                  Faculty
                </FieldLabel>
                <Input {...field} value={field.value || ""} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Designation */}
          <Controller
            name="designation"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold text-gray-700">
                  Designation
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Designation</SelectLabel>
                      <SelectItem value="LECTURER">Lecturer</SelectItem>
                      <SelectItem value="ASSISTANT_PROFESSOR">
                        Assistant Professor
                      </SelectItem>
                      <SelectItem value="ASSOCIATE_PROFESSOR">
                        Associate Professor
                      </SelectItem>
                      <SelectItem value="PROFESSOR">Professor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Department */}
          <Controller
            name="department"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-semibold text-gray-700">
                  Department
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Department</SelectLabel>
                      <SelectItem value="Computer_Science_And_Information_Technology">
                        Computer Science and Information Technology
                      </SelectItem>
                      <SelectItem value="Computer_science_And_Communication_Engineering">
                        Computer Science and Communication Engineering
                      </SelectItem>
                      <SelectItem value="Electrical_And_Electronic_Engineering">
                        Electrical and Electronic Engineering
                      </SelectItem>
                      <SelectItem value="Physics_And_Mechanical_Engineering">
                        Physics and Mechanical Engineering
                      </SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
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

        {/* Address */}
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="font-semibold text-gray-700">
                Address
              </FieldLabel>
              <Textarea {...field} rows={3} value={field.value || ""} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
