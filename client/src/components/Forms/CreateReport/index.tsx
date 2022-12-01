import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useContext, useState } from "react";

import { Input } from "../../Input";
import { Button } from "../../Button";
import { IReport } from "../../../interfaces";
import { createReport } from "../../../services/reportsServices";

import NotificationContext from "../../../context/NotificationContext";

import styles from "./styles.module.scss";

interface Props {
  getReports: () => void;
}

export const CreateReport = ({ getReports }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dataLS = JSON.parse(localStorage.getItem("gdi-user")!);

  const { showNotification } = useContext(NotificationContext);

  const initialValues: IReport = {
    userRef: dataLS?.user && dataLS?.user._id,
    month: "",
    initialMoney: 0,
  };

  const handleSubmit = async (values: IReport) => {
    try {
      setLoading(true);
      const response = await createReport(values);
      await getReports();

      /* @ts-ignore */
      showNotification({
        msj: response?.msj,
        open: true,
        status: response?.report ? "success" : "error",
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
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
      {() => (
        <Form noValidate className={styles.form}>
          <p>Crear reporte</p>
          <div className={styles.inputs}>
            <Input name="month" type="text" placeholder="Mes..." />
            <Input
              name="initialMoney"
              type="number"
              placeholder="Dinero inicial..."
            />
            <Button buttonText="Crear reporte" isLoading={loading} />
          </div>
        </Form>
      )}
    </Formik>
  );
};
