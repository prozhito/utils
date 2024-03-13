import React from 'react'
import { useAccount } from '~/api/account'
import { ModalAccount } from '../modal/account'
import { createPortal } from 'react-dom'

import styles from './.module.css'

const defaultUser = './icon/user.svg'

function getInitials(user: Record<string, string>) {
  return `${(user.first_name ?? '').charAt(0)}${(user.last_name ?? '').charAt(0)}`
}

export const UserMenu = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const { loading, error, user, login, logout } = useAccount()
  /* 
  React.useEffect(() => {
    console.log('loading:', loading)
    console.log('error:', error)
    console.log('user:', user)
  }, [])
 */
  return (
    <>
      <div className={styles.user__menu} onClick={() => setModalVisible(true)}>
        {user ? getInitials(user) : <img src={defaultUser} />}
      </div>

      {typeof window !== 'undefined' &&
        createPortal(
          <ModalAccount {...{ loading, error, user, login, logout, visible: modalVisible, closeModal: () => setModalVisible(false) }} />,
          document.body
        )}
    </>
  )
}
