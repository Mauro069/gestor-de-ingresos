import { useCallback, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import NotificationContext from "../../context/NotificationContext";
import { IExpense, IPercentage, IReport } from "../../interfaces";
import {
  createExpense,
  getExpensesByReport,
  getPercentages,
  getTypesExpenses,
} from "../../services/expensesServices";

import { CreateExpense } from "../../components/Forms/CreateExpense";
import { useFilter } from "../../hooks/useFilter";
import TitlesAndGraphic from "./components/TitlesAndGraphic";
import { ExpenseCard } from "../../components/ExpenseCard";
import FilterByType from "./components/FilterByType";

import styles from "./styles.module.scss";
import { getReportById } from "../../services/reportsServices";

export function ReportDetail() {
  const [report, setReport] = useState<IReport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<IExpense[] | null>(null);
  const [percentages, setPercentages] = useState<IPercentage[] | null>(null);
  const [expensesTypes, setExpensesTypes] = useState(null);

  const { reportId } = useParams();
  const { showNotification } = useContext(NotificationContext);
  const { filtrar, filterSelected, dataFiltered } = useFilter(expenses!);

  const getReport = useCallback(async () => {
    const response = await getReportById(reportId);
    setReport(response.report);
  }, []);

  const getExpensesPercentages = async () => {
    const response = await getPercentages(reportId);
    setPercentages(response?.expensesSeparated);
  };

  const getExpenses = async () => {
    const response = await getExpensesByReport(reportId);
    setExpenses(response.expenses);
  };

  const getExpensesTypes = async () => {
    const response = await getTypesExpenses();
    setExpensesTypes(response.expenseTypes);
  };

  useEffect(() => {
    if (reportId) {
      getReport();
      getExpenses();
      getExpensesPercentages();
      getExpensesTypes();
    }
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await createExpense(values);
      /* @ts-ignore */
      showNotification({
        msj: response.msj,
        open: true,
        status: response.expense ? "success" : "error",
      });

      console.log(response);

      if (response?.expense) {
        await getExpenses();
        await getReport();
        await getExpensesPercentages();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className={styles.reportDetailPage}>
      <div className={styles.left}>
        <TitlesAndGraphic report={report} percentages={percentages} />
        <CreateExpense onSubmit={handleSubmit} loading={loading} />
      </div>

      <div className={styles.rigth}>
        <div className={styles.top}>
          <h1>Tus gastos</h1>
          <FilterByType
            filters={expensesTypes!}
            /* @ts-ignore */
            filterSelected={filterSelected}
            setFilterSelected={filtrar}
          />
        </div>
        <div className={styles.expenses}>
          {dataFiltered?.map((expense: IExpense) => (
            <ExpenseCard
              key={expense._id}
              callbacks={async () => {
                await getExpenses();
                await getReport();
                await getExpensesPercentages();
              }}
              {...expense}
            />
          ))}
          {!expenses?.length && <p>No has cargado ningun gasto</p>}
        </div>
      </div>
    </div>
  );
}
