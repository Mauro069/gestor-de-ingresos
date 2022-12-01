import { Arrow } from "../../assets/svg/Arrow";

import styles from "./styles.module.scss";

interface Props {
  page: number;
  changePage: (page: number) => void;
  perPage: number;
  listItems: number;
}

export const Pagination = ({ page, changePage, perPage, listItems }: Props) => {
  const lastPage = Math.ceil(listItems / perPage);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.previous}
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
      >
        <Arrow />
      </button>

      <p>
        <b>{page}</b> de {lastPage}
      </p>

      <button
        className={styles.next}
        disabled={page === lastPage}
        onClick={() => changePage(page + 1)}
      >
        <Arrow />
      </button>
    </div>
  );
};
