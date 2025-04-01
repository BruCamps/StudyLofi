import { createPortal } from 'react-dom';
import { gifYay } from '../Gifs/Gifs';
import Text from '../Text/Text';
import styles from './modals.module.css';

function ModalPomodoro({ isOpen }) {
    // const randomGif = (gif) => {
    //     const randomIndex = Math.floor(Math.random() * gif.length);
    //     return gif[randomIndex];
    // };

    if(!isOpen) return null;

    if(isOpen) {
        return (
            <>
            {createPortal(
                <div className={styles.contentPomodoro}>
                    <div className={styles.content}>
                        <img src={gifYay[4]} alt="" />
                        <Text.H4>Parabéns, você completou a sessão do pomodoro!</Text.H4>
                    </div>
                </div>,
                document.body.querySelector('.timer-container')
            )}
            </>
        )
    }
}

export default ModalPomodoro;