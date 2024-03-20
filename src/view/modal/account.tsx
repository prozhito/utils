import { FormInput, FormSubmit } from '../ui/form'
import { Button } from '../ui'
import { UserInfo } from '../user/user'
import styles from './.module.css'

type TFormLoginProps = {
  loading: boolean
  error: string
  user: Record<string, string> | null
  login: (data: Record<string, string>) => void
  logout: () => void
  visible: boolean
  closeModal: () => void
}

export const ModalAccount = ({ loading, error, user, login, logout, visible, closeModal }: TFormLoginProps) => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)
    const data: Record<string, string> = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    }
    // console.log('Sending:', data)
    login(data)
    event.preventDefault()
  }

  const handleClick = (event: React.MouseEvent) => {
    if (!visible) return
    const { target, currentTarget } = event
    if (target === currentTarget) {
      event.preventDefault()
      closeModal()
    }
  }

  // const info = () => console.log(user)

  return (
    <div className={visible ? styles.modal : styles.modal_hidden} onClick={handleClick}>
      <div className={styles.modal__inner}>
        <div className={styles.modal__close} onClick={closeModal}>
          <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <line stroke="currentColor" x1="3" y1="3" x2="15" y2="15" />
            <line stroke="currentColor" x1="3" y1="15" x2="15" y2="3" />
          </svg>
        </div>
        {!user && (
          <>
            <h1>Sign in</h1>
            <form onSubmit={submitHandler} className={styles.form__login}>
              <FormInput type="email" name="email" placeholder={'email'} />
              <FormInput type="password" name="password" placeholder={'password'} />
              {error && <p>Error: {error}</p>}
              <FormSubmit disabled={loading}>{'login'}</FormSubmit>
            </form>
            <div className={styles.form__login_buttons}>
              <Button onClick={() => location.assign('/register')}>{'signin'}</Button>
              <Button onClick={() => location.assign('/reset-password')}>{'lostPassword'}</Button>
            </div>
          </>
        )}
        {user && (
          <>
            <h1>Account</h1>
            <UserInfo user={user} />
            <Button onClick={logout}>{'logout'}</Button>
            <Button onClick={() => location.assign('https://profile.prozhito.org')}>{'openAccount'}</Button>
            {/* <Button onClick={killToken}>Kill token</Button> */}
          </>
        )}
        {/* <Button onClick={info}>Info</Button> */}
      </div>
    </div>
  )
}
