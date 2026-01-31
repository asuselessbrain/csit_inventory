import { IProposal } from "./projectThesis.type";

type TeacherStatus = "ACTIVE" | "STUDY_LEAVE" | "RETIRED"
type TeacherDesignation = "LECTURER" | "ASSISTANT_PROFESSOR" | "ASSOCIATE_PROFESSOR" | "PROFESSOR"
type Department = "Computer_Science_And_Information_Technology" | "Computer_science_And_Communication_Engineering" | "Electrical_And_Electronic_Engineering" | "Physics_And_Mechanical_Engineering" | "Mathematics"
export interface ITeacher {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    address: string;
    photoUrl?: string;
    faculty: string;
    department: Department;
    designation: TeacherDesignation;
    isChairman: boolean;
    joinedAt: string;
    status: TeacherStatus;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    // user?: User;
    projectTheses?: IProposal[];
    // courseTeachers?: CourseTeacher[];
}
