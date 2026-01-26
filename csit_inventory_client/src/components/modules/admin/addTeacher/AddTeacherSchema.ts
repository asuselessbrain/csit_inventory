import z from "zod";

export const teacherSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must not exceed 50 characters"),

    name: z
        .string()
        .min(3, "Teacher name must be at least 3 characters")
        .max(100, "Teacher name must not exceed 100 characters"),

    phoneNumber: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, "Phone number must be valid (10–15 digits)"),

    address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(200, "Address must not exceed 200 characters"),

    faculty: z.literal("Computer Science and Engineering"),

    designation: z.enum([
        "LECTURER",
        "ASSISTANT_PROFESSOR",
        "ASSOCIATE_PROFESSOR",
        "PROFESSOR"
    ]).refine(val => !!val, {
        message: "Select a valid department",
    }),

    department: z.enum([
        "Computer_Science_And_Information_Technology",
        "Computer_science_And_Communication_Engineering",
        "Electrical_And_Electronic_Engineering",
        "Physics_And_Mechanical_Engineering",
        "Mathematics"
    ]).refine(val => !!val, {
        message: "Select a valid department",
    }),

    joinedAt: z
        .string()
        .min(3, "Joined date is required")
        .refine((val) => isNaN(Date.parse(val)) === false, {
            message: "Invalid date format"
        }),

    profilePhoto: z.any().optional(), // file input
});