import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "../interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { login, register, verifyToken } from "../services/authServices";

import NotificationContext from "./NotificationContext";

const defaultState: IState = {
  data: {
    user: {} as IUser,
    token: "",
  },
  auth: null,
};

export const AuthContext = createContext<any>(defaultState);

interface IState {
  data: {
    user: IUser | null | undefined;
    token: string | undefined;
  };
  auth: boolean | null;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<IState>(defaultState);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { showNotification } = useContext(NotificationContext);

  const onLogin = async (values: { email: string; password: string }) => {
    const response = await login(values);

    if (response?.msj !== "Contraseña incorrecta") {
      setAuthState({
        auth: true,
        data: { token: response?.token, user: response?.user },
      });
      localStorage.setItem(
        "gdi-user",
        JSON.stringify({
          token: response?.token,
          user: response?.user,
        })
      );
      navigate("/home");
    }

    /* @ts-ignore */
    showNotification({
      msj: response?.msj!,
      status: response?.user ? "success" : "error",
      open: true,
    });
  };

  const onRegister = async (values: { email: string; password: string }) => {
    const response = await register(values);

    if (response?.user) {
      setAuthState({
        auth: true,
        data: { token: response?.token, user: response?.user },
      });
      localStorage.setItem(
        "gdi-user",
        JSON.stringify({
          token: response?.token,
          user: response?.user,
        })
      );
      navigate("/home");
    }

    /* @ts-ignore */
    showNotification({
      msj: response?.msj!,
      status: response?.user ? "success" : "error",
      open: true,
    });
  };

  const logout = async () => {
    setAuthState(defaultState);
    navigate("/");
    localStorage.removeItem("gdi-user");
  };

  const validateUser = async () => {
    const response = await verifyToken();

    if (response.msj !== "Token valido") {
      setAuthState(defaultState);
      localStorage.removeItem("gdi-user");
      navigate("/");

      return;
    }

    setAuthState({
      auth: true,
      data: { token: response?.token, user: response?.user },
    });
    localStorage.setItem(
      "gdi-user",
      JSON.stringify({
        token: response?.token,
        user: response?.user,
      })
    );
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("gdi-user")!);

    if (data?.token) {
      validateUser();
      return;
    }

    if (pathname === "/" || pathname === "/register") return;
    navigate("/");
  }, []);

  return (
    <AuthContext.Provider value={{ authState, onLogin, onRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
