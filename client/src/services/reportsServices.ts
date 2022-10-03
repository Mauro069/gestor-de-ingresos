import { IReport } from "../interfaces";
import { api } from "./apiBase";

const dataLS = JSON.parse(localStorage.getItem("gdi-user")!);

export const getReportsByUser = async (id?: string) => {
  try {
    const { data }: any = await api.get(`/reports/user/${id}`, {
      headers: { token: dataLS?.token },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createReport = async (values: IReport) => {
  try {
    const { userRef, initialMoney, month } = values;
    const { data } = await api.post(
      "http://localhost:4000/api/reports",
      {
        userRef,
        initialMoney,
        month,
      },
      {
        headers: { token: dataLS?.token },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getReportById = async (reportId?: string) => {
  try {
    const { data } = await api.get(
      `http://localhost:4000/api/reports/${reportId}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
