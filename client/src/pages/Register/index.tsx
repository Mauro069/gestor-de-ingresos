import * as Yup from "yup";
import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";

import { AuthProps } from "../../interfaces";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { register } from "../../services/authServices";

import NotificationContext from "../../context/NotificationContext";

import styles from "./styles.module.scss";
import AuthContext from "../../context/AuthContext";

const initialValues: AuthProps = {
  email: "",
  password: "",
};

export const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { onRegister } = useContext(AuthContext);

  const handleSubmit = async (values: AuthProps) => {
    try {
      setIsLoading(true);
      await onRegister(values);
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
            <h1>Registrate</h1>
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
            <Button buttonText="Crear cuenta" isLoading={isLoading} />
            <span className={styles.login}>
              Ya tienes cuenta? <Link to="/">Inicia sesión!</Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};
