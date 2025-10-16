export type Role = "admin" | "user";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: Role;
  condition: string;
}
