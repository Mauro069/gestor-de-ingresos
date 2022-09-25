import axios from "axios";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import Loader from "../../components/Loader";

import styles from "./styles.module.scss";

interface FormProps {
  email: string;
  password: string;
}

interface ResponseProps {
  data: {
    msj: string;
    user: {
      email: string;
      password: string;
      _id: string;
    };
  };
}

const initialValues: FormProps = {
  email: "",
  password: "",
};

export const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (values: FormProps) => {
    setIsLoading(true);

    try {
      const { email, password } = values;

      const { data }: ResponseProps = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { msj, user } = data;

      if (user) {
        localStorage.setItem("gdi-user", JSON.stringify(user));
        setIsLoading(false);
        navigate("/home");
      }

      setIsLoading(false);
      setMessage(msj);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const validations = Yup.object({
    email: Yup.string().email("Email no valido").required("Requerido"),
    password: Yup.string().required("Requerido"),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        {(formik) => (
          <Form noValidate>
            <h1>Iniciar Sesión</h1>
            <div className={styles.inputs}>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Email..."
              />
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Password..."
              />
            </div>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <Loader /> Cargando...
              </div>
            ) : (
              <button type="submit">Iniciar sesion</button>
            )}
            {message && <span>{message}</span>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
