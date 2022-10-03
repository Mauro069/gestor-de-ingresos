import { IExpense, IExpenseType } from "../interfaces";
import { api } from "./apiBase";

const dataLS = JSON.parse(localStorage.getItem("gdi-user")!);

export const getExpensesByReport = async (reportId?: string) => {
  try {
    const { data }: any = await api.get(`/expenses/report/${reportId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createExpense = async (values: IExpense) => {
  try {
    const { reportRef, description, date, type, amount } = values;
    const { data } = await api.post(
      "http://localhost:4000/api/expenses",
      {
        date,
        type,
        amount,
        reportRef,
        description,
      },
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteExpense = async (_id: string) => {
  try {
    const { data } = await api.delete(
      `http://localhost:4000/api/expenses/${_id}`,

      { headers: { token: dataLS?.token } }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPercentages = async (reportId?: string) => {
  try {
    const { data }: any = await api.get(`/expenses/percentage/${reportId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTypesExpenses = async () => {
  try {
    const { data }: any = await api.get(`/expense-types`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
