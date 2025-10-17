export type Role = "admin" | "user";

export interface IUser {
  email: ReactNode;
  condition: ReactNode;
  
  
  data: {
    _id?: string;
    name: string;
    email: string;
    role: Role;
    condition: string;
  };
}