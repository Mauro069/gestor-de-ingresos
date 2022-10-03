import { useCallback, useContext, useEffect, useState } from "react";
import { CreateReport } from "../../components/Forms/CreateReport";
import { ReportCard } from "../../components/ReportCard";
import AuthContext from "../../context/AuthContext";
import { IReport } from "../../interfaces";

import { getReportsByUser } from "../../services/reportsServices";

import styles from "./styles.module.scss";

export const Home = () => {
  const [reports, setReports] = useState<IReport[] | null>(null);
  const dataLS = JSON.parse(localStorage.getItem("gdi-user")!);

  const getReports = useCallback(async () => {
    const response = await getReportsByUser(dataLS?.user._id);
    setReports(response?.reports);
  }, []);

  useEffect(() => {
    dataLS?.user !== undefined && getReports();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Reportes</h1>
      <div className={styles.cardsContainer}>
        {reports?.map((report: IReport) => (
          <ReportCard key={report._id} {...report} />
        ))}
      </div>
      <CreateReport getReports={getReports} />
    </div>
  );
};
