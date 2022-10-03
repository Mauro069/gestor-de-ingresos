import { useEffect, useState } from "react";
import { FilterIcon } from "../../../../assets/svg/FilterIcon";
import { IExpenseType } from "../../../../interfaces";

import styles from "./styles.module.scss";

interface Props {
  filters: IExpenseType[];
  filterSelected?: IExpenseType;
  setFilterSelected: (filter: IExpenseType) => void;
}

const FilterByType = ({
  filters,
  filterSelected,
  setFilterSelected,
}: Props) => {
  const [open, setOpen] = useState(false);

  const defaultValue = { name: "Todos", _id: "Todos", color: "#fff" };

  return (
    <>
      <div className={styles.filter}>
        <div onClick={() => setOpen(!open)} className={styles.selected}>
          <span>
            {filterSelected?.name ? filterSelected.name : defaultValue.name}
          </span>
          <FilterIcon className={open ? styles.rotateTop : styles.rotateDown} />
        </div>

        <div className={open ? styles.othersOpen : styles.othersClose}>
          <div
            onClick={() => {
              setFilterSelected(defaultValue);
              setOpen(false);
            }}
            className={styles.filterItem}
          >
            {defaultValue.name}
          </div>
          {filters?.map((filter: IExpenseType, i) => (
            <div
              key={filter._id}
              onClick={() => {
                setFilterSelected(filter);
                setOpen(false);
              }}
              className={styles.filterItem}
            >
              {filter.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterByType;
