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

  useEffect(() => {
    if (authState.data.token || dataLS) {
      getReports();
    }
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
