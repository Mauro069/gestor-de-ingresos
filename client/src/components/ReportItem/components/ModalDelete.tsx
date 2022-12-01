import { Threepoints } from "../../../assets/svg/ThreePoints";
import styles from "./ModalDelete.module.scss";

interface Props {
  setModal: (modal: boolean) => void;
  modal: boolean;
}

export const ModalDelete = ({ setModal, modal }: Props) => {
  return (
    <div className={styles.modalDelete}>
      <Threepoints onClick={() => setModal(!modal)} />
      {modal && (
        <div className={styles.modal}>
          <p>Borrar</p>
        </div>
      )}
    </div>
  );
};
