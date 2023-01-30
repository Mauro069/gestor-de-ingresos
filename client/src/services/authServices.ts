import { api } from "./apiBase";

export interface authProps {
  email: string;
  password: string;
  auth: 'login' | 'register'
}

const dataLS = JSON.parse(localStorage.getItem("gdi-user")!);

export const authService = async ({ email, password, auth }: authProps) => {
  try {
    const { data }: any = await api.post(`/auth/${auth}`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const verifyToken = async () => {
  try {
    const { data }: any = await api.get("/auth/verify", {
      headers: { token: dataLS?.token },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
