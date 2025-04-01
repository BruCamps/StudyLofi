import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css';
import * as Lucide from 'lucide-react';
import { gifRelax, gifStudy } from '../Gifs/Gifs';
import ModalTime from '../Modal/ModalTime';
import Button from '../Button/Button';
import Text from '../Text/Text';

function Timer() {
  const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [gifChoosen, setGifChosen] = useState('');
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      if (isPaused) return;
      
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [ isPaused ]);
  
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
  
    const randomGif = (gif) => {
      const randomIndex = Math.floor(Math.random() * gif.length);
      return gif[randomIndex];
    };
  
    return (
      <div className={styles.timerContainer}>
        <ModalTime 
          isOpen={show} 
          setOpen={() => setShow(!show)}
          title={'Meta de estudo'}>
            <Text.H3>Digite o tempo que pretende estudar</Text.H3>
            <div className={styles.contentTimeInputs}>
              <input type="text" placeholder='00' />
              :
              <input type="text" placeholder='00' />
              :
              <input type="text" placeholder='00' />
            </div>
        </ModalTime>
        <div className={styles.header}>
          <Text.H1>Timer</Text.H1>
          <Button className={styles.timerIcon} onClick={() => setShow(!show)}>
            <Lucide.AlarmClock className={styles.icon} width={30} height={30} />        
          </Button>
        </div>
        <img className={styles.timerGif} src={gifChoosen || gifRelax[12]} alt="" />
        <Text.H2>
          {hours < 10 ? '0' + hours : hours}
          :
          {minutes < 10 ? '0' + minutes : minutes}
          :
          {seconds < 10 ? '0' + seconds : seconds}
        </Text.H2>
        <div className={styles.timerButtons}>
          <Button
            variant='reset'
            onClick={() => {
              if (time > 0) {
                setTime(0);
                setIsPaused(true);
                setGifChosen(randomGif(gifRelax));
              }
            }}
          >
            <Lucide.RotateCcw className={styles.icon} width={28} height={28} />
          </Button>
          <Button 
            variant='btn-play' 
            onClick={() => { 
              setIsPaused(!isPaused);
              isPaused ? setGifChosen(randomGif(gifStudy)) : setGifChosen(randomGif(gifRelax));
          }}>
            {isPaused ? (
              <Lucide.Play fill='white' color='white' width={24} height={24} />
            ) : (
              <Lucide.Pause fill='white' color='transparent' width={28} height={28} />
            )}
          </Button>
          <Button variant='reset'>
            <Lucide.Music className={styles.icon} width={28} height={28} />
          </Button>
        </div>
      </div>
    );
}

export default Timer