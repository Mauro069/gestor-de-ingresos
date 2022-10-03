import { useNavigate } from "react-router-dom";
import { IReport } from "../../interfaces";

import styles from "./styles.module.scss";

export const ReportCard = ({
  initialMoney,
  month,
  _id,
  currentAmount,
}: IReport) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/report/${_id}`)}
      className={styles.reportCard}
    >
      <p>{month}</p>
      <span>Dinero inicial: ${initialMoney}</span>
      <hr/>
      <span>Dinero Actual: ${currentAmount}</span>
    </div>
  );
};
