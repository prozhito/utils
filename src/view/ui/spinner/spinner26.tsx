import styles from './.module.css'

export const LittleSpinner = ({ size = 16 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" className={styles.spinner26} xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="11" />
      <path d="m24,13c0-6.08-4.92-11-11-11" />
      <path d="m10.53,2.29C6.44,3.23,3.23,6.44,2.29,10.53" />
      <path d="m2,13c0,2.11.61,4.08,1.64,5.76" />
    </svg>
  )
}
