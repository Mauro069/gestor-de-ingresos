import { useContext, useEffect } from "react";
import { CreateReport } from "../../components/Forms/CreateReport";
import { Layout } from "../../components/Layout";
import { ReportsList } from "../../components/ReportsLIst";
import ReportsContext from "../../context/ReportsContext/ReportsContext";

import { withPoints } from "../../utils/withPoints";

import styles from "./styles.module.scss";

export function Home() {
  const { reports, getReports } = useContext(ReportsContext);

  const getTotalCurrentMoney = () => {
    let currentMoneyTotal: number | undefined = reports?.reduce((prev, act) => {
      return (prev += act?.currentAmount!);
    }, 0);

    return currentMoneyTotal && withPoints(currentMoneyTotal);
  };

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
          <CreateReport getReports={getReports!} />
        </div>
        <ReportsList reports={reports} />
      </div>
    </Layout>
  );
}
