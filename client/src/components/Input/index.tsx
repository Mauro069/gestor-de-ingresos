import styles from "./styles.module.scss";

interface Props {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  as?: string;
}

export const Input = ({ label, name, type, placeholder, as }: Props) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label>{label}</label>}
      <h1>Agregar label e input</h1>
    </div>
  );
};

/* <Field as={as} name={name} type={type} placeholder={placeholder} />
      <ErrorMessage name={name} component={"span"} /> */
