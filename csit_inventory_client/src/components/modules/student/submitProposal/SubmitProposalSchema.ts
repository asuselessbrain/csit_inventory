import z from "zod";

export const proposalSchema = z.object({
  courseId: z.string().min(1, "Course is required"),  // New field
  supervisorId: z.string().min(1, "Supervisor is required"),  // New field
  type: z.enum(["PROJECT", "THESIS"]),  // New field
  projectTitle: z
    .string()
    .min(5, "Project title must be at least 5 characters")
    .max(100, "Project title must not exceed 100 characters"),
  abstract: z
    .string()
    .min(50, "Abstract must be at least 50 characters"),
  projectObjectives: z
    .string()
    .min(20, "Objectives are required"),
  methodology: z
    .string()
    .min(20, "Methodology description is required"),
  expectedOutcomes: z
    .string()
    .min(20, "Expected outcomes are required"),
  technologiesTools: z
    .string()
    .min(5, "Technologies/tools are required"),
  estimatedTimeline: z
    .string()
    .min(5, "Timeline is required")
});
