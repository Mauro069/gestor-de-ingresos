import styles from "./styles.module.scss";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Layout = ({ children }: Props) => {
  return <div className={styles.layout}>{children}</div>;
};
