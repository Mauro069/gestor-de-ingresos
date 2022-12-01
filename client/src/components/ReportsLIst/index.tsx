import { IReport } from "../../interfaces";
import ReportItem from "../ReportItem";
import ReportsTitles from "../ReportsTitles";

import styles from "./styles.module.scss";
interface Props {
  reports: IReport[] | null;
}

export const ReportsList = ({ reports }: Props) => {
  return (
    <div className={styles.reportsList}>
      <h4>Tus reportes</h4>
      <div className={styles.reports}>
        <ReportsTitles />

        {reports?.map((report) => (
          <ReportItem key={report?._id} {...report} />
        ))}
      </div>
    </div>
  );
};
