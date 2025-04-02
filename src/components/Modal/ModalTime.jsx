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
                                <Text.H1>{title}</Text.H1>
                                <Button className={styles.btnClose} onClick={setOpen}>
                                    <Lucide.X className={styles.icon} />
                                </Button>
                            </div>
                            <>
                                <Text.H3>Digite o tempo que pretende estudar</Text.H3>
                                <div className={styles.contentTimeInputs}>
                                    <input type="number" placeholder="00"   />:
                                    <input type="number" placeholder="00" />:
                                    <input type="number" placeholder="00" />
                                </div> 
                                <Button fullWidth>
                                    Definir
                                </Button>
                            </>
                        </div>
                    </div>, 
                    document.body
                )}
            </>
        )
    }
}


