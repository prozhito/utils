import React from 'react'
import { Account } from '../account'

export const useUser = () => {
  const [user, setUser] = React.useState<Record<string, string> | null>(null)

  React.useEffect(() => {
    const account = new Account(() => {
      setUser(new Account().info().user)
      console.log('update')
    })
    setUser(account.info().user)
  }, [])

  return user
}
