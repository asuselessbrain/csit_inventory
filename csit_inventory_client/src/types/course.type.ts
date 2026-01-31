export interface ICourse {
  id: string;
  courseCode: string;
  courseName: string;
  description: string | null;
  credits: number;
  semester: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
