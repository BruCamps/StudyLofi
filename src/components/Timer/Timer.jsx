import React, { useState, useEffect, useCallback } from 'react';
import styles from './timer.module.css';
import * as Lucide from 'lucide-react';
import { gifBreak, gifStudy } from '../Gifs/Gifs';
import ModalTime from '../Modal/ModalTime';
import Button from '../Button/Button';
import Text from '../Text/Text';

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  const [selectedGif, setSelectedGif] = useState(gifBreak[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateElapsedTime = useCallback(() => {
    setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
  }, []);

  useEffect(() => {
    if (isTimerPaused) return;
    const intervalId = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(intervalId);
  }, [isTimerPaused, updateElapsedTime]);

  const formatTime = (time) => time.toString().padStart(2, '0');

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  const getRandomGif = (gifArray) => gifArray[Math.floor(Math.random() * gifArray.length)];

  const toggleTimer = () => {
    setIsTimerPaused((prev) => !prev);
    setSelectedGif(getRandomGif(isTimerPaused ? gifStudy : gifBreak));
  };

  const resetTimer = () => {
    if (elapsedTime === 0) return;

    setElapsedTime(0);
    setIsTimerPaused(true);
    setSelectedGif(getRandomGif(gifBreak));
  };

  return (
    <div className={styles.timerContainer}>
      <ModalTime isOpen={isModalOpen} setOpen={() => setIsModalOpen((prev) => !prev)} title="Meta de estudo" />
      <div className={styles.header}>
        <Text.H1>Timer</Text.H1>
        <Button id="timer-button-icon" aria-label="Timer Button" className={styles.timerIcon} onClick={() => setIsModalOpen((prev) => !prev)}>
          <Lucide.AlarmClock className={styles.icon} width={30} height={30} />
        </Button>
      </div>
      <img id="timer-gif" className={styles.timerGif} src={selectedGif} fetchPriority="high" alt="Animated gif of Lofi Girl" />
      <Text.H2>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </Text.H2>
      <div className={styles.timerButtons}>
        <Button id="reset-button-icon" aria-label="Timer Reset Button" variant="reset" onClick={resetTimer}>
          <Lucide.RotateCcw className={styles.icon} width={28} height={28} />
        </Button>
        <Button id="play-button-icon" aria-label="Timer Play Button" variant="btn-play" onClick={toggleTimer}>
          {isTimerPaused ? (<Lucide.Play fill="white" color="white" width={24} height={24} />) : (
            <Lucide.Pause fill="white" color="transparent" width={28} height={28} />
          )}
        </Button>
        <Button id="music-button-icon" aria-label="Timer Music Button" variant="reset">
          <Lucide.Music className={styles.icon} width={28} height={28} />
        </Button>
      </div>
    </div>
  );
};

export default Timer;