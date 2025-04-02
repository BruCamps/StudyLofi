import { createPortal } from 'react-dom';
import { gifYay } from '../Gifs/Gifs';
import Text from '../Text/Text';
import styles from './modals.module.css';
import stylesP from '../PomodoroTimer/pomodorotimer.module.css';

function ModalPomodoro({ isOpen }) {
    if(!isOpen) return null;

    const randomGif = (gif) => {
        const randomIndex = Math.floor(Math.random() * gif.length);
        return gif[randomIndex];
    };


    if(isOpen) {
        return (
            <>
            {createPortal(
                <div className={styles.contentPomodoro}>
                    <div className={styles.content}>
                        <img src={randomGif(gifYay)} alt="Joy Gif" />
                        <Text.H4>Parabéns, você completou a sessão do pomodoro!</Text.H4>
                    </div>
                </div>,
                document.body.querySelector(`.${stylesP.timerContainer}`)
            )}
            </>
        )
    }
}

export default ModalPomodoro;