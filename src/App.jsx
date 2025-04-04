import ThemeButton from './components/Button/ThemeButton';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import Timer from './components/Timer/Timer';

export default function App() {
  return (
    <div className='bg-page'>
      <div className="header">
        <div className="logo">
          <img src="/StudyLofi/icon.webp" alt="Logo Pomofi" />
          <h1 className='logo-text'>Pomofi</h1>
        </div>
        <div className='theme-container'>
          <ThemeButton theme='pink-dark' />
          <ThemeButton theme='green-dark' />
          <ThemeButton theme='bege-light' />
        </div>
      </div>
      <PomodoroTimer />
      <Timer />
    </div>
  );
}
