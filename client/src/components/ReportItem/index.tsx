import { useState } from "react";
import { IReport } from "../../interfaces";
import {
  colorsAndMessages,
  getStateOfExpenses,
} from "../../utils/percentageUtils";
import { withPoints } from "../../utils/withPoints";
import { ModalDelete } from "./components/ModalDelete";
import { Text } from "./components/Text";

import styles from "./styles.module.scss";

const ReportItem = ({ initialMoney, month, currentAmount }: IReport) => {
  const [modal, setModal] = useState(false);

  const expense = initialMoney - currentAmount!;
  const percentage = parseInt((expense / (initialMoney / 100)).toFixed(2));

  return (
    <div onMouseLeave={() => setModal(false)} className={styles.reportItem}>
      <Text className={styles.month} title="Mes:" data={month} />
      <div className={styles.flex}>
        <Text title="Dinero Inicial:" data={`$${withPoints(initialMoney)}`} />
        <Text title="Dinero Gastado:" data={`$${withPoints(initialMoney - currentAmount!)}`} />
        <Text title="Dinero Actual:" data={`$${withPoints(currentAmount!)}`} />
        <Text title="Porcentaje Gastado:" data={`${percentage}% ${getStateOfExpenses(percentage)!}`} styles={{ color: colorsAndMessages[getStateOfExpenses(percentage)!] }} />
        <ModalDelete modal={modal} setModal={setModal} />
      </div>
    </div>
  );
};

export default ReportItem;
