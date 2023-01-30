

interface Props {
  label?: string;
  name: string;
  [key: string]: any;
}

export const MySelect = ({ label, ...props }: Props) => {
  

  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <h1>Crear select</h1> 
    </>
  );
};

/* <ErrorMessage name={props.name} component="span" /> */
