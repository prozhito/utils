import React from 'react'
import { useAccount } from '~/api/account'
import { ModalAccount } from '../modal/account'
import { createPortal } from 'react-dom'
import router from '~/utils/Router'

import styles from './.module.css'

const defaultUser = './icon/user.svg'

function getInitials(user: Record<string, string>) {
  return `${(user.first_name ?? '').charAt(0)}${(user.last_name ?? '').charAt(0)}`
}

export const UserMenu = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const { loading, error, user, login, logout } = useAccount()

  React.useEffect(() => {
    if (router.getRoute()?._pathname === '/login' || (!loading && !user)) setModalVisible(true)
    else if (modalVisible && !loading) {
      setModalVisible(false)
      router.reload()
    }
    // console.log('loading:', loading, 'error:', error, 'user:', user)
  }, [loading])

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
