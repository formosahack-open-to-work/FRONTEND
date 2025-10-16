export type Role = "admin" | "user";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
