import { LittleSpinner } from '../../spinner/spinner26'
import styles from './.module.css'

export const FormSubmit = ({ children, disabled }: { children: string; disabled: boolean }) => {
  return (
    <button className={styles.form__submit} type="submit" disabled={disabled}>
      {disabled ? (
        <>
          <LittleSpinner />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
