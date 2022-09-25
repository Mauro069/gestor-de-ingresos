import { Formik, Form } from "formik";
import { useState } from "react";
import { IReport } from "../../interfaces";
import { Input } from "../Input";
import Loader from "../Loader";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import axios from "axios";

interface Props {
  getReports: () => void;
}

const user = JSON.parse(localStorage.getItem("gdi-user")!);
const initialValues: IReport = {
  userRef: user?._id,
  month: "",
  initialMoney: 0,
};

export const CreateReportForm = ({ getReports }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (values: IReport) => {
    try {
      const { initialMoney, month, userRef } = values;

      const { data } = await axios.post("http://localhost:4000/api/reports", {
        userRef,
        initialMoney,
        month,
      });

      console.log(data);
      getReports();
    } catch (error) {}
  };

  const validations = Yup.object({
    month: Yup.string().required("Requerido"),
    initialMoney: Yup.number().required("Requerido").notOneOf([0], "Requerido"),
  });

  return (
    <Formik
     initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validations}
    >
      {(formik) => (
        <Form noValidate className={styles.form}>
          <h1>Crear reporte</h1>
          <div className={styles.inputs}>
            <Input label="Mes" name="month" type="text" placeholder="Mes..." />
            <Input
              label="Dinero inicial"
              name="initialMoney"
              type="number"
              placeholder="Dinero inicial..."
            />
          </div>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Loader /> Cargando...
            </div>
          ) : (
            <button type="submit">Crear reporte</button>
          )}
          {message && <span>{message}</span>}
        </Form>
      )}
    </Formik>
  );
};
