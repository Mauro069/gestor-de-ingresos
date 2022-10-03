import { useEffect, useState } from "react";
import { IExpense, IExpenseType } from "../interfaces";

export const useFilter = (initialState: IExpense[]) => {
  const [dataFiltered, setDataFiltered] = useState(initialState);
  const [filterSelected, setFilterSelected] = useState("Todos");

  const filtrar = (filtro: any) => {
    setFilterSelected(filtro);

    if (filtro.name === "Todos") {
      setDataFiltered(initialState);
    } else {
      setDataFiltered(
        initialState.filter((expense: IExpense) => {
          console.log(expense);
          return expense.type?._id === filtro._id;
        })
      );
    }
  };

  console.log(dataFiltered);

  useEffect(() => {
    setDataFiltered(initialState);
  }, [initialState]);

  return {
    filtrar,
    dataFiltered,
    filterSelected,
    setDataFiltered,
  };
};
