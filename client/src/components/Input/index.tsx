import { ErrorMessage, Field } from "formik";
import styles from "./styles.module.scss";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

export const Input = ({ label, name, type, placeholder }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <Field name={name} type={type} placeholder={placeholder} />
      <ErrorMessage name={name} component={"span"} />
    </div>
  );
};
