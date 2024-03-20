import React from 'react'
import { Account } from '../account'

export const useUser = () => {
  const [user, setUser] = React.useState<{ loading: boolean; user: Record<string, string> | null }>({ loading: true, user: null })

  React.useEffect(() => {
    const account = new Account(() => {
      setUser({ loading: account.info().loading, user: account.info().user })
      // console.log(account.info().user)
    })
    setUser({ loading: account.info().loading, user: account.info().user })
  }, [])

  return user
}
