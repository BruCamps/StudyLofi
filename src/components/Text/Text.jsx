import styles from './text.module.css'

const H1 = ({ children }) => {
    return <h1 className={styles.h1}>{children}</h1>
}

const H2 = ({ children }) => {
    return <h2 className={styles.h2}>{children}</h2>
}

const H3 = ({ children }) => {
    return <h3 className={styles.h3}>{children}</h3>
}

const H4 = ({ children }) => {
    return <h4 className={styles.h4}>{children}</h4>
}

const P = ({ children }) => {
    return <p className={styles.p}>{children}</p>
}

const SPAN = ({ children }) => {
    return <span className={styles.span}>{children}</span>
}

const Text = {
    H1,
    H2,
    H3,
    H4,
    P,
    SPAN
}

export default Text