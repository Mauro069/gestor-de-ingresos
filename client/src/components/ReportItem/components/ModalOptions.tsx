import { useNavigate } from "react-router-dom";
import { Threepoints } from "../../../assets/svg/ThreePoints";
import { deleteReportById } from "../../../services/reportsServices";

import styles from "./ModalOptions.module.scss";

interface Props {
  setModal: (modal: boolean) => void;
  modal: boolean;
  reportId: string;
}

interface OptionProps {
  title: string;
  onClick: any;
}

export const ModalOptions = ({ setModal, modal, reportId }: Props) => {
  const navigate = useNavigate();

  const onDelete = async () => {
    const reportDeleted = await deleteReportById(reportId);
    console.log(reportDeleted);
  };

  const options: OptionProps[] = [
    {
      title: "Ver detalle",
      onClick: () => navigate(`/report/${reportId}`),
    },
    {
      title: "Borrar",
      onClick: () => onDelete(),
    },
  ];

  return (
    <div className={styles.modalOptions}>
      <Threepoints onClick={() => setModal(!modal)} />
      {modal && (
        <div className={styles.modal}>
          {options.map(({ title, onClick }, i) => (
            <p key={i} onClick={onClick} className={styles.option}>
              {title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
