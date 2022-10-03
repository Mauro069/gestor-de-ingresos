import { useField, ErrorMessage } from "formik";

interface Props {
  label?: string;
  name: string;
  [key: string]: any;
}

export const MySelect = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <select {...field} {...props} />
      <ErrorMessage name={props.name} component="span" />
    </>
  );
};
