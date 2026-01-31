import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
const nameRegex = /^[a-zA-Z\s'.-]{3,}$/;

export const registrationSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    ),
  name: z
    .string()
    .min(3, "Full Name must be at least 3 characters")
    .regex(nameRegex, "Full Name cannot contain emojis or special characters")
    .nonempty("Full Name is required"),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number")
    .nonempty("Phone number is required"),
  address: z.string().nonempty("Address is required"),
  studentId: z.string().nonempty("Student ID is required"),
  registrationNumber: z.string().nonempty("Registration number is required"),
  profilePhoto: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024,
      "Image size must be less than 2MB",
    )
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type,
        ),
      "Only JPG, PNG, or WEBP images are allowed",
    ),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  session: z.string().nonempty("Session is required"),
  schoolName: z.string().nonempty("School name is required"),
  collageName: z.string().nonempty("College name is required"),
});
