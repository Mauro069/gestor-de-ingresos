export interface IReport {
  initialMoney: number;
  month: string;
  userRef: string;
  _id?: string;
}

export interface AuthProps {
  email: string;
  password: string;
}

export type StatusNotification = "error" | "success" | null;

export interface IUser {
  email: string;
  password?: string;
  _id: string;
}

export type UserTypes = "admin" | null;
