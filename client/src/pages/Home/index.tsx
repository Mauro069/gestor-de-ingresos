import { useCallback, useContext, useEffect, useState } from "react";
import { CreateReportForm } from "../../components/CreateReportForm";
import { ReportCard } from "../../components/ReportCard";
import AuthContext from "../../context/AuthContext";
import { IReport } from "../../interfaces";

import { getReportsByUser } from "../../services/reportsServices";

import styles from "./styles.module.scss";

export const Home = () => {
  const [reports, setReports] = useState<IReport[] | null>(null);

  const { authState } = useContext(AuthContext);

  const getReports = useCallback(async () => {
    console.log(authState?.data?.user?._id);
    const response = await getReportsByUser(authState?.data?.user?._id);
    setReports(response?.reports);
    console.log(response);
  }, []);

  useEffect(() => {
    authState?.data?.user && getReports();
  }, []);

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
