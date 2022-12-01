import { useCallback, useContext, useEffect, useState } from "react";
import { CreateReport } from "../../components/Forms/CreateReport";
import { Layout } from "../../components/Layout";
import { ReportsList } from "../../components/ReportsLIst";
import AuthContext from "../../context/AuthContext";
import { IReport } from "../../interfaces";

import { getReportsByUser } from "../../services/reportsServices";
import { withPoints } from "../../utils/withPoints";

import styles from "./styles.module.scss";

export const Home = () => {
  const [reports, setReports] = useState<IReport[] | null>(null);
  const dataLS = JSON.parse(localStorage.getItem("gdi-user")!);
  const { authState } = useContext(AuthContext);

  const getReports = useCallback(async () => {
    if (authState?.data?.token) {
      let response = await getReportsByUser(
        authState?.data?.user?._id,
        authState?.data?.token
      );
      setReports(response?.reports);
    } else {
      let response = await getReportsByUser(dataLS?.user._id);
      setReports(response?.reports);
    }
  }, []);

  const getTotalCurrentMoney = () => {
    let currentMoneyTotal: number | undefined = reports?.reduce((prev, act) => {
      return (prev += act?.currentAmount!);
    }, 0);

    return currentMoneyTotal && withPoints(currentMoneyTotal);
  };

  useEffect(() => {
    if (authState.data.token || dataLS) {
      getReports();
    }
  }, []);

  useEffect(() => {
    if (reports) {
      getTotalCurrentMoney();
    }
  }, []);

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.welcome}>
          <div>
            <h1>Bienvenido!</h1>
            <h4>
              Tienes <b>${getTotalCurrentMoney()}</b> actualmente
            </h4>
          </div>
          <CreateReport getReports={getReports} />
        </div>
        <ReportsList reports={reports} />
      </div>
    </Layout>
  );
};
