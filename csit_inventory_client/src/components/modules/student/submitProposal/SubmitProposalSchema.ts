import z from "zod";

export const proposalSchema = z.object({
  projectTitle: z.string().min(5, 'Project title must be at least 5 characters').max(100, 'Project title must not exceed 100 characters'),
  abstract: z.string().min(50, 'Abstract must be at least 50 characters').max(300, 'Abstract must not exceed 300 characters'),
  projectObjectives: z.string().min(20, 'Objectives are required').max(1000, 'Objectives must not exceed 1000 characters'),
  methodology: z.string().min(20, 'Methodology description is required').max(1000, 'Methodology must not exceed 1000 characters'),
  expectedOutcomes: z.string().min(20, 'Expected outcomes are required').max(1000, 'Outcomes must not exceed 1000 characters'),
  technologiesTools: z.string().min(5, 'Technologies/tools are required'),
  estimatedTimeline: z.string().min(5, 'Timeline is required'),
  attachments: z.instanceof(FileList).optional(),
});
