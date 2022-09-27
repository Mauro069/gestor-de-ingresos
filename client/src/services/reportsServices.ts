import { api } from "./apiBase";

export const getReportsByUser = async (id: string) => {
  console.log(id)
  try {
    const { data }: any = await api.get(`/reports/user/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
