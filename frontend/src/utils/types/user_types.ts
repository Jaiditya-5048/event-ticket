export type Role = 'user' | 'organiser' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  createdAt: string;
}
