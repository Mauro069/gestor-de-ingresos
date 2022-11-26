import { IReport } from "../../interfaces";

import styles from "./styles.module.scss";
interface Props {
  reports: IReport[] | null;
}

export const ReportsList = ({ reports }: Props) => {
  return (
    <div className={styles.reportsList}>
      <h4>Tus reportes</h4>
      <div className={styles.reports}>
        <FirstItem />

        {reports?.map((report) => (
          <SecondItem key={report?._id} {...report} />
        ))}
      </div>
    </div>
  );
};

const FirstItem = () => {
  return (
    <div className={styles.firstItem}>
      <span>Mes</span>
      <span>Dinero Inicial</span>
      <span>Dinero Gastado</span>
      <span>Dinero Actual</span>
      <span>Porcentaje Gastado</span>
    </div>
  );
};

const SecondItem = ({ initialMoney, month, _id, currentAmount }: IReport) => {
  const expense = initialMoney - currentAmount!;
  const percentage = parseInt((expense / (initialMoney / 100)).toFixed(2));

  const getStateOfExpenses = (percentage: number) => {
    if (percentage >= 0 && percentage < 21) return "😁";
    else if (percentage > 21 && percentage < 41) return "😃";
    else if (percentage >= 41 && percentage < 61) return "🙂";
    else if (percentage >= 61 && percentage < 81) return "😐";
    else if (percentage >= 81 && percentage < 100) return "😑";
    else if (percentage === 100) return "😶";
  };

  const colorsAndMessages = {
    ["😁"]: "#20FF1C",
    ["😃"]: "#B6FF1C",
    ["🙂"]: "#FFDB1C",
    ["😐"]: "#FF961C",
    ["😑"]: "#FF521C",
    ["😶"]: "#FF1C1C",
  };

  return (
    <div className={styles.secondItem}>
      <span className={styles.month}>
        <b>Mes </b>| {month}
      </span>
      <div className={styles.flex}>
        <span>
          <b>Dinero Inicial: </b>${initialMoney}
        </span>
        <span>
          <b>Dinero Gastado: </b>${initialMoney - currentAmount!}
        </span>
        <span>
          <b>Dinero Actual: </b>${currentAmount}
        </span>
        <span
          style={{ color: colorsAndMessages[getStateOfExpenses(percentage)!] }}
        >
          <b>Porcentaje Gastado: </b> {percentage}%{" "}
          {getStateOfExpenses(percentage)!}
        </span>
      </div>
      <SvgButton />
    </div>
  );
};

const SvgButton = () => {
  return (
    <svg
      width="5"
      height="22"
      viewBox="0 0 5 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.20833 11.8752C2.87567 11.8752 3.41666 11.3342 3.41666 10.6668C3.41666 9.99948 2.87567 9.4585 2.20833 9.4585C1.54099 9.4585 1 9.99948 1 10.6668C1 11.3342 1.54099 11.8752 2.20833 11.8752Z"
        stroke="current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.20833 3.41666C2.87567 3.41666 3.41666 2.87567 3.41666 2.20833C3.41666 1.54099 2.87567 1 2.20833 1C1.54099 1 1 1.54099 1 2.20833C1 2.87567 1.54099 3.41666 2.20833 3.41666Z"
        stroke="current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.20833 20.3334C2.87567 20.3334 3.41666 19.7924 3.41666 19.1251C3.41666 18.4577 2.87567 17.9167 2.20833 17.9167C1.54099 17.9167 1 18.4577 1 19.1251C1 19.7924 1.54099 20.3334 2.20833 20.3334Z"
        stroke="current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
