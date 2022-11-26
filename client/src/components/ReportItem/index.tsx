import { useNavigate } from "react-router-dom";
import { IReport } from "../../interfaces";

import styles from "./styles.module.scss";

export const ReportItem = ({
  initialMoney,
  month,
  _id,
  currentAmount,
}: IReport) => {
  console.log({ initialMoney, month, _id, currentAmount });
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/report/${_id}`)}
      className={styles.reportCard}
    >
      <p>{month}</p>
      <span>Dinero inicial: ${initialMoney}</span>
      <span>Dinero Actual: ${currentAmount}</span>
    </div>
  );
};
