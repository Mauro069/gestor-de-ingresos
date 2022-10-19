import { Formik, Form } from "formik";

import styles from "./styles.module.scss";
import { Input } from "../../Input";
import { MySelect } from "../../Select";
import { Button } from "../../Button";
import { IExpense, IExpenseType } from "../../../interfaces";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getTypesExpenses } from "../../../services/expensesServices";

interface Props {
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
}

export const CreateExpense = ({ onSubmit, loading }: Props) => {
  const [expenseTypes, setExpenseTypes] = useState<IExpenseType[] | null>(null);

  const { reportId } = useParams();

  const getExpenseTypes = useCallback(async () => {
    const response = await getTypesExpenses();
    /* @ts-ignore */
    setExpenseTypes(response.expenseTypes);
  }, []);

  useEffect(() => {
    if (reportId) {
      getExpenseTypes();
    }
  }, []);

  const initialValues: IExpense = {
    reportRef: reportId,
    date: "",
    type: null,
    description: "",
    amount: 0,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange }) => (
        <Form noValidate className={styles.form}>
          <h1>Agregar Gasto</h1>
          <div className={styles.flex}>
            <input
              name="description"
              autoComplete="off"
              placeholder="Descripcion..."
              className={styles.textArea}
              onChange={(e) => handleChange(e)}
            />
            <div className={styles.rigth}>
              <Input name="date" type="date" />
              <Input name="amount" type="number" />
              <MySelect name="type">
                <option value="">Tipo de gasto</option>
                {expenseTypes?.map((expenseType: any) => (
                  <option key={expenseType._id} value={expenseType._id}>
                    {expenseType.name}
                  </option>
                ))}
              </MySelect>
            </div>
          </div>
          <Button buttonText="Agregar gasto" isLoading={loading} />
        </Form>
      )}
    </Formik>
  );
};
