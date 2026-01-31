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
import { ICourse } from "@/types";
import { updateCourse } from "@/services/courseService";
import { BookOpen, Code, Layers, CalendarDays } from "lucide-react";
import { Controller, useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "../createCourse/CreateCourseSchema";

interface UpdateCourseProps {
  course: ICourse;
}

export default function UpdateCourse({ course }: UpdateCourseProps) {
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseCode: course.courseCode,
      courseName: course.courseName,
      credits: course.credits?.toString() || "",
      semester: (course.semester as "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "FIFTH" | "SIXTH" | "SEVENTH" | "EIGHTH") || "",
      description: course.description || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  const toastId = "update-course";

  const handleUpdate = async (data: FieldValues) => {
    const payload = {
      courseName: data.courseName,
      credits: parseFloat(data.credits),
      semester: data.semester,
      description: data.description,
    };

    const res = await updateCourse(course.id, payload);

    if (res.success) {
      toast.success(res.message || "Course updated successfully", {
        id: toastId,
      });
    } else {
      toast.error(res.errorMessage || "Failed to update course", {
        id: toastId,
      });
    }
  };

  if (isSubmitting) {
    toast.loading("Updating course...", { id: toastId });
  }

  return (
    <DialogContent className="max-w-2xl max-h-9/10 overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-900">
          Update Course
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Modify course details and click save to update
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className="space-y-6 py-4"
      >
        {/* Course Code (disabled) */}
        <Controller
          name="courseCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-indigo-600" />
                <FieldLabel htmlFor={field.name}>Course Code</FieldLabel>
              </div>
              <Input
                {...field}
                id={field.name}
                disabled
                className="bg-gray-50"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <p className="text-xs text-gray-500">
                Course code cannot be modified
              </p>
            </Field>
          )}
        />

        {/* Course Name */}
        <Controller
          name="courseName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <FieldLabel htmlFor={field.name}>Course Name</FieldLabel>
              </div>
              <Input
                {...field}
                id={field.name}
                placeholder="e.g., Programming Language Sessional"
                value={field.value || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credits */}
          <Controller
            name="credits"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-green-600" />
                  <FieldLabel htmlFor={field.name}>Credits</FieldLabel>
                </div>
                <Input
                  {...field}
                  type="number"
                  min={0.5}
                  max={4}
                  step={0.25}
                  id={field.name}
                  placeholder="e.g., 3"
                  value={field.value === undefined ? "" : String(field.value)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Semester */}
          <Controller
            name="semester"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-indigo-600" />
                  <FieldLabel htmlFor={field.name}>Semester</FieldLabel>
                </div>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
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

        {/* Description */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Description (Optional)
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="Describe the course content and objectives..."
                rows={4}
                value={field.value || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Dialog Footer */}
        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="disabled:cursor-no-drop"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
