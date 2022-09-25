import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CreateReportForm } from "../../components/CreateReportForm";
import { ReportCard } from "../../components/ReportCard";
import { IReport } from "../../interfaces";

import styles from "./styles.module.scss";

export const Home = () => {
  const [reports, setReports] = useState<IReport[] | null>(null);

  const user = JSON.parse(localStorage.getItem("gdi-user")!);

  const getReports = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/reports/user/${user._id}`
    );

    setReports(data.reports);
  }, []);

  useEffect(() => {
    user && getReports();
  }, []);

  console.log(reports);

  return (
    <div className={styles.container}>
      <h1>Reportes</h1>
      <div className={styles.cardsContainer}>
        {reports?.map((report: IReport) => (
          <ReportCard key={report._id} {...report} />
        ))}
      </div>
      <CreateReportForm getReports={getReports} />
    </div>
  );
};
