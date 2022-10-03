import { useContext } from "react";
import { Trash } from "../../assets/svg/Trash";
import NotificationContext from "../../context/NotificationContext";
import { IExpense } from "../../interfaces";
import { deleteExpense } from "../../services/expensesServices";
import { transformNumber } from "../../utils/transformNumber";

import styles from "./styles.module.scss";

interface Props extends IExpense {
  callbacks: () => void;
}

export const ExpenseCard = ({
  type,
  date,
  amount,
  description,
  _id,
  callbacks,
}: Props) => {
  const { showNotification } = useContext(NotificationContext);

  const trashExpense = async () => {
    const response: { msj: string; expenseDeleted: IExpense } =
      await deleteExpense(_id!);
    await callbacks();

    /* @ts-ignore */
    showNotification({
      msj: response.msj,
      open: true,
      status: response.expenseDeleted ? "success" : "error",
    });
  };

  return (
    <div
      className={styles.expenseCard}
      /* style={{ borderBottomColor: `${type?.color}` }} */
    >
      <div className={styles.left}>
        <h3>Gastaste ${transformNumber(amount)}</h3>
        <div>
          <p>Descripción:</p>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <div
            style={{
              borderBottomColor: type?.color,
              borderBottom: `2px solid ${type?.color}`,
              color: type?.color,
            }}
            className={styles.type}
          >
            {type?.name}
          </div>
          <div onClick={trashExpense} className={styles.trash}>
            <Trash />
          </div>
        </div>
        <span>{date}</span>
      </div>
    </div>
  );
};
