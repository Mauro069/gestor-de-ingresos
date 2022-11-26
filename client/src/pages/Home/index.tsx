import { useCallback, useContext, useEffect, useState } from "react";
import { CreateReport } from "../../components/Forms/CreateReport";
import { Layout } from "../../components/Layout";
import { ReportsList } from "../../components/ReportsLIst";
import AuthContext from "../../context/AuthContext";
import { IReport } from "../../interfaces";

import { getReportsByUser } from "../../services/reportsServices";

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
    <Layout>
      <ReportsList reports={reports} />
      {/* <CreateReport getReports={getReports} /> */}
    </Layout>
  );
};
