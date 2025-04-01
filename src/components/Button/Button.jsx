import styles from './button.module.css'

const Button = ({children, variant, fullWidth, ...props}) => {
    return (
        <button   
        className={`${styles.btn} ${styles[variant]} ${fullWidth ? ' ' + styles.fullWidth : ''}`}
        {...props}>
            {children}
        </button>
    ) 
}

export default Button