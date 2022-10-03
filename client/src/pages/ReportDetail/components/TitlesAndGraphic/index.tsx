import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IPercentage, IReport } from "../../../../interfaces";
import { transformNumber } from "../../../../utils/transformNumber";

import styles from "./styles.module.scss";

interface Props {
  report: IReport | null;
  percentages: IPercentage[] | null;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const TitlesAndGraphic = ({ report, percentages }: Props) => {
  const data = {
    datasets: [
      {
        data: percentages?.map((p) => p.value),
        backgroundColor: percentages?.map((p) => p.color),
        borderColor: percentages?.map((p) => p.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.titlesAndGraphic}>
      <h1>
        Reporte de <b>{report?.month}</b>
      </h1>
      <div className={styles.flex}>
        <div className={styles.col}>
          <div className={styles.currentAmount}>
            <span>Dinero actual:</span>
            <b>${transformNumber(report?.currentAmount!)}</b>
          </div>
          <div className={styles.types}>
            {percentages?.map((item) => {
              return <Type key={item.value} {...item} />;
            })}
          </div>
        </div>
        <div className={styles.graphic}>
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

const Type = ({ color, name }: IPercentage) => {
  return (
    <div className={styles.type}>
      <div className={styles.rectangle} style={{ backgroundColor: color }} />
      <span>% en {name}</span>
    </div>
  );
};

export default TitlesAndGraphic;
