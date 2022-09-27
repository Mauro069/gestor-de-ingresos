import styles from "./styles.module.scss";
import Loader from "../Loader";

interface Props {
  isLoading?: boolean;
  buttonText: string;
}

export const Button = ({ isLoading, buttonText }: Props) => {
  return isLoading ? (
    <div className={styles.loadingContainer}>
      <Loader /> Cargando...
    </div>
  ) : (
    <button type="submit">{buttonText}</button>
  );
};
