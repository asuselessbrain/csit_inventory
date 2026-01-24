export type UserRole = "ADMIN" | "TEACHER" | "STUDENT"
export interface IUser {
    email: string;
    role: UserRole;
    exp: number;
  iat: number;
}