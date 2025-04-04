import { createPortal } from 'react-dom';
import * as Lucide from 'lucide-react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import styles from './modals.module.css';

export default function ModalTime({ isOpen, setOpen, title }) {
  
    if(!isOpen) return null;

    if(isOpen) {
        return (
            <>
                {createPortal(
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <Text.H1 className={styles.modalTitle}>{title}</Text.H1>
                                <Button id="close-modal-button" aria-label="close" className={styles.btnClose} onClick={setOpen}>
                                    <Lucide.X className={styles.icon} />
                                </Button>
                            </div>
                            <>
                                <Text.H3>Digite o tempo que pretende estudar</Text.H3>
                                <div className={styles.contentTimeInputs}>
                                    <div className={styles.contentInput}>
                                        <input type="number" placeholder="00" className={styles.inputTime} aria-label='hours' id='hours' name='hours' />
                                        <Text.P>Horas</Text.P>
                                    </div>
                                    <Text.SPAN>:</Text.SPAN>
                                    <div className={styles.contentInput}>
                                        <input type="number" placeholder="00" className={styles.inputTime} aria-label='minutes' id='minutes' name='minutes' />
                                        <Text.P>Minutos</Text.P>
                                    </div>
                                </div> 
                                <Button id="submit-modal-button" aria-label="submit" type="submit" fullWidth>Definir</Button>
                            </>
                        </div>
                    </div>, 
                    document.body
                )}
            </>
        )
    }
}


