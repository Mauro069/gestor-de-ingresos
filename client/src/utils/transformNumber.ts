export const transformNumber = (number: number | bigint) => {
  const internationalNumberFormat = new Intl.NumberFormat("es-AR");
  return internationalNumberFormat.format(number);
};
