import z from "zod";

export const SemesterEnum = z.enum([
  "FIRST",
  "SECOND",
  "THIRD",
  "FOURTH",
  "FIFTH",
  "SIXTH",
  "SEVENTH",
  "EIGHTH",
]);

export const courseSchema = z.object({
  courseCode: z
    .string()
    .regex(
      /^[A-Z]{2,4}-\d{3}$/,
      "Course code must follow the format CCE-221"
    ),

  courseName: z
    .string()
    .min(3, "Course name must be at least 3 characters")
    .max(100, "Course name must not exceed 100 characters"),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional()
    .or(z.literal("")),

  credits: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z
      .number()
      .min(0.5, "Credits must be at least 0.5")
      .max(4, "Credits must not exceed 4")
  ),

  semester: SemesterEnum,
});
