import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "../interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { authProps, authService } from "../services/authServices";

import NotificationContext from "./NotificationContext";

const defaultState: IState = {
  data: {
    user: {} as IUser,
    token: "",
  },
  auth: null,
};

interface IAuthContext {
  authState: IState;
  onAuth: ({ email, password, auth }: authProps) => void;
  logout: () => void;
}

interface IState {
  data: {
    user: IUser | null | undefined;
    token: string | undefined;
  };
  auth: boolean | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<IState>(defaultState);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { showNotification } = useContext(NotificationContext);

  const onAuth = async ({ email, password, auth }: authProps) => {
    const response = await authService({
      auth,
      email,
      password,
    });

    if (response.ok) {
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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("gdi-user")!);

    if (data?.token) {
      /* validateUser(); */
    } else {
      if (pathname === "/" || pathname === "/register") return;
      navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, onAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
