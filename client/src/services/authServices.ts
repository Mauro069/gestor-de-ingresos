import { api } from "./apiBase";

interface authProps {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    msj: string | null | undefined;
    token: string;
    user: {
      email: string;
      password: string;
      _id: string;
    };
  };
}

export const login = async ({ email, password }: authProps) => {
  try {
    const { data }: LoginResponse = await api.post("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async ({ email, password }: authProps) => {
  try {
    const { data }: any = await api.post("/auth/register", {
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
    const { data }: any = await api.get("/auth/verify");
    return data;
  } catch (error) {
    console.error(error);
  }
};
