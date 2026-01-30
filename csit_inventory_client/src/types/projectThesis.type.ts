import { ICourse } from "./course.type"
import { ITask } from "./task.type"
import { ITeacher } from "./teacher.type"

export interface IProposal {
  id: string
  projectTitle: string
  abstract: string
  projectObjectives: string
  methodology: string
  expectedOutcomes: string
  technologiesTools?: string[]
  estimatedTimeline?: string
  attachments?: string[]
  type?: "PROJECT" | "THESIS"
  status: "PENDING" | "APPROVED" | "REJECTED" | "in_PROGRESS" | "COMPLETED"
  courseId?: string
  supervisorId?: string
  course: ICourse
  supervisor: ITeacher
  student: {
    name: string
    studentId: string
  }
  tasks: ITask[]
  createdAt?: string
  updatedAt?: string
}