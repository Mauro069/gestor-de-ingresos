export interface IReport {
  initialMoney: number;
  month: string;
  userRef: string | null | undefined;
  _id?: string;
  currentAmount?: number;
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

export interface IExpenseType {
  _id: string;
  color: string;
  name: string;
}

export interface IExpense {
  date: string;
  description: string;
  reportRef?: string;
  type?: IExpenseType | null;
  _id?: string;
  amount: number;
}

export interface IPercentage {
  value: number;
  name: string;
  color: string;
}
