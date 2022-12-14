import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthProps } from "../../interfaces";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import AuthContext from "../../context/AuthContext";

import styles from "./styles.module.scss";

const initialValues: AuthProps = {
  email: "",
  password: "",
};

export const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onLogin } = useContext(AuthContext);

  const handleSubmit = async (values: AuthProps) => {
    try {
      setIsLoading(true);
      await onLogin(values);
      setIsLoading(false);
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
            <Button buttonText="Iniciar sesión" isLoading={isLoading} />
            <span className={styles.register}>
              Aun no tienes cuenta? <Link to="/register">Registrate</Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};
