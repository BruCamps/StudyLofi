import ThemeButton from './components/Button/ThemeButton';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import Timer from './components/Timer/Timer';

export default function App() {
  return (
    <div className='bg-page'>
      <div className='theme-container'>
        <ThemeButton theme='pink-dark' />
        <ThemeButton theme='green-dark' />
        <ThemeButton theme='bege-light' />
      </div>
      <PomodoroTimer />
      <Timer />
    </div>
  );
}
