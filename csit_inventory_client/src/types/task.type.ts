import { IProposal } from "./projectThesis.type";

export interface IProjectThesisUpdateLog {
  id: string;
  projectThesisId: string;
  taskId: string;
  liveLink?: string;
  fileUrl: string;
  updatedAt: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE" | "FAILED";
  requirements: string[];
  referenceMaterials: string[];
  projectThesisId: string;
  projectThesis?: IProposal;
  createdAt: string;
  updatedAt: string;
  projectThesisUpdateLogs?: IProjectThesisUpdateLog[];
}
