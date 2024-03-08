import { TFormInputProps } from './types'
import styles from './.module.css'

export const FormInput: React.FC<TFormInputProps> = ({ name, type, placeholder = '' }) => {
  return (
    <div className={styles.form__input_container}>
      <input className={styles.form__input} type={type} name={name} id={`form_${name}`} placeholder="" minLength={8} maxLength={28} required={true} />
      <label className={styles.form__input_label} htmlFor={`form_${name}`}>
        {placeholder}
      </label>
      <span className={styles.form__valid}>&#x2714;</span>
    </div>
  )
}
