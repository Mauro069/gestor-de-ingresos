import { IReport } from "../../interfaces";

import styles from './styles.module.scss'

export const ReportCard = ({ initialMoney, month }: IReport) => {
  return (
    <div className={styles.reportCard}>
      <p>{month}</p>
      <span>Dinero: ${initialMoney}</span>
    </div>
  );
};
