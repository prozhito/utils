import styles from './.module.css'

export const Button = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <button className={styles.button__base} onClick={onClick}>
      {children}
    </button>
  )
}
