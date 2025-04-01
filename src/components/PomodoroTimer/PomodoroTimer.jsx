import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import styles from './pomodorotimer.module.css';
import ModalPomodoro from '../Modal/ModalPomodoro';
import Text from '../Text/Text';
import Button from '../Button/Button';

export default function PomodoroTimer() {
  const [isPaused, setIsPaused] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const circleRadius = 52;
  const circleCircumference = 2 * Math.PI * circleRadius;
  
  const activateStep = (selector) => document.querySelector(selector)?.classList.add(`${styles.active}`);

  useEffect(() => {
    const stepDurations = [25 * 60, 5 * 60, 15 * 60];
    const stepSelectors = [`.${styles.contentStep}:nth-child(1)`, `.${styles.contentStep}:nth-child(2)`, `.${styles.contentStep}:nth-child(3)`];
    
    const isEvenStep = currentStep % 2 === 0;
    const isFinalStep = currentStep === 7;
    const isLastStep = currentStep === 8;

    if (currentStep === 0) {
      document.querySelector(`.${styles.step}:nth-child(1)`).classList.add(`${styles.active}`);
    }

    if (isFinalStep) {
      document.querySelector(`.${styles.break}:nth-child(${currentStep + 1})`)?.classList.add(`${styles.active}`);
      activateStep(stepSelectors[2]);
      setTimeLeft(stepDurations[2]);
    } else if (isEvenStep && !isLastStep) {
      document.querySelector(`.${styles.step}:nth-child(${currentStep + 1})`)?.classList.add(`${styles.active}`);
      activateStep(stepSelectors[0]);
      setIsPaused(true);
      setTimeLeft(stepDurations[0]);
    } else if (!isEvenStep) {
      document.querySelector(`.${styles.break}:nth-child(${currentStep + 1})`)?.classList.add(`${styles.active}`);
      activateStep(stepSelectors[1]);
      setTimeLeft(stepDurations[1]);
    } else if (isLastStep) {
      document.querySelector(`.${styles.step}:nth-child(${currentStep + 1})`)?.classList.add(`${styles.active}`);
      setIsOpen(true);
      activateStep(stepSelectors[2]);
    }

    stepSelectors.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        const isActive = isFinalStep || isLastStep ? index === 2 : currentStep % 2 === index;
        element.classList.toggle(`${styles.active}`, isActive);
      }
    });
  }, [currentStep]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          setIsPaused(true);
          setIsReset(false);

          setCurrentStep(() => {
            if (currentStep === 8) {
              setIsOpen(true);
              return 0;
            }
            setTimeout(() => setIsPaused(false), 3000);
            return currentStep + 1;
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, currentStep]);


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const strokeDashoffset = circleCircumference - (timeLeft / (currentStep === 7 ? 15 * 60 : currentStep % 2 === 0 ? 25 * 60 : 5 * 60)) * circleCircumference;

  return (
    <div className={styles.shadowTimerContainer}>
      {isOpen && <ModalPomodoro isOpen={isOpen} />}
      <div className={styles.timerContainer}>
        <div className={styles.timerCircleContainer}>
          <div className={styles.timerTextContainer}>
            <Text.SPAN>
              {`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
            </Text.SPAN>
            <Text.P>
              {currentStep % 2 === 0 ? 'Study Time' : (currentStep === 7 ? 'Long Break' : 'Break Time')}
            </Text.P>
          </div>
          <svg width="100%" height="100%" viewBox="0 0 120 120">
            <circle
              r={circleRadius}
              className={styles.progressCircle}
            />
            <circle
              r={circleRadius}
              className={styles.progressBar}
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
            />
          </svg>
        </div>

        <div className={styles.contentSteps}>
          <div className={styles.contentStep}>
            <Lucide.LibraryBig className={styles.icon} />
          </div>
          <div className={styles.contentStep}>
            <Lucide.Coffee className={styles.icon} />
          </div>
          <div className={styles.contentStep}>
            <Lucide.MoonStar className={styles.icon} />
          </div>
        </div>

        <div className={styles.contentSteps}>
          {Array(4).fill(null).map((_, index) => (
            <React.Fragment key={index}>
              <div className={`${styles.step} ${index === 0 ? `${styles.active}` : ''}`}>
                <Lucide.BookOpen className={styles.icon} />
              </div>
              {index < 4 && <div className={styles.break}></div>}
            </React.Fragment>
          ))}
          <div className={styles.step}>
            <Lucide.BadgeCheck className={styles.icon} />
          </div>
        </div>

        <div className={styles.contentBtns}>
          <Button
            fullWidth
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
                document.querySelectorAll(`${styles.step}, ${styles.break}`).forEach((step) => {
                  if (step !== document.querySelector(`${styles.step}:nth-child(1)`)) {
                    step.classList.remove(`${styles.active}`);
                  }
                });
                setCurrentStep(0);
                setIsPaused(true);
              } else {
                setIsPaused(!isPaused);
                setIsReset(false);
              }
            }}
          >
            {isReset || (currentStep === 0 && [1500, 300, 900].includes(timeLeft) && !isOpen) ? 'Iniciar' : 
            (!isReset && isPaused && !isOpen ? 'Continuar' : (
              isOpen === true ? 'Resetar Pomodoro' : 'Parar')
            )}
          </Button>

          {((isPaused || timeLeft === 0) && !isOpen) && (
            <Button
              fullWidth
              variant='reset'
              onClick={() => {
                setIsPaused(true);
                setIsReset(!isReset);
                setTimeLeft(25 * 60);
                setCurrentStep(0);
                document.querySelectorAll(`.${styles.step}, .${styles.break}`).forEach((step) => {
                  if(step !== document.querySelector(`.${styles.step}:nth-child(1)`)) {
                    step.classList.remove(`${styles.active}`);
                  }
                });
              }}
            >
              Resetar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
