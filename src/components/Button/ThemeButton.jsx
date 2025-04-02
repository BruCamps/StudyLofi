import styles from './button.module.css';

const ThemeButton = ({ theme }) => {
  const changeTheme = () => document.body.setAttribute('data-theme', theme);
 
  return (
    <div onClick={changeTheme} id={`${styles[`theme-${theme}`]}`}></div>
  )
};

export default ThemeButton;