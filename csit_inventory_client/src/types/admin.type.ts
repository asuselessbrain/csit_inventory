export interface IAdmin {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
