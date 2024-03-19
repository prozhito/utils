import styles from './.module.css'
import { LittleSpinner } from '~/view/ui/spinner'

type TButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
}

export const Button = ({ children, onClick, loading = false, disabled = false }: TButtonProps) => {
  return (
    <button className={styles.button__base} onClick={onClick} disabled={disabled}>
      {loading ? (
        <>
          <LittleSpinner /> Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
