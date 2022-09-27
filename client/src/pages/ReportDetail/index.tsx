import axios from "axios";
import { Formik, Form } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../../components/Input";
import Loader from "../../components/Loader";
import { MySelect } from "../../components/Select";
import { IReport } from "../../interfaces";

import styles from "./styles.module.scss";

export const ReportDetail = () => {
  const [report, setReport] = useState<IReport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [expenseTypes, setExpenseTypes] = useState<any>(null);
  const { reportId } = useParams();

  const getReport = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/reports/${reportId}`
    );

    setReport(data.report);
  }, []);

  const getExpenseTypes = useCallback(async () => {
    const { data } = await axios.get("http://localhost:4000/api/expense-types");

    setExpenseTypes(data.expenseTypes);
  }, []);

  useEffect(() => {
    if (reportId) {
      getReport();
      getExpenseTypes();
    }
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const { data } = await axios.post("http://localhost:4000/api/expenses", {
        reportRef: values.reportRef,
        description: values.description,
        date: values.date,
        type: values.type,
      });

      setMessage(data.msj); 
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const initialValues = {
    reportRef: reportId,
    date: "",
    type: "",
    description: "",
  };

  return (
    <div>
      <h3>Report Detail de {report?.month}</h3>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form noValidate className={styles.form}>
              <h1>Agregar Gasto</h1>
              <div className={styles.inputs}>
                <Input
                  label="Descripcion"
                  name="description"
                  type="text"
                  placeholder="Descripcion..."
                />
                <Input label="Fecha" name="date" type="date" />
                <MySelect label={"Tipo de gasto"} name="type">
                  <option value="">Selecciona un tipo de gasto</option>
                  {expenseTypes?.map((expenseType: any) => (
                    <option key={expenseType._id} value={expenseType._id}>
                      {expenseType.name}
                    </option>
                  ))}
                </MySelect>
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
      </div>
    </div>
  );
};
