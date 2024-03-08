import React from 'react'
import { Account } from '../account'

type TUser = Record<string, string>

type TAccount = {
  loading: boolean
  error: string
  user: TUser | null
  login: (data: TUser) => void
  logout: () => void
}

export const useAccount = (): TAccount => {
  const account = new Account()
  const [state, setState] = React.useState<TAccount>({ ...account.info(), login: account.login, logout: account.logout })

  const update = React.useCallback(() => {
    setState(prev => ({ ...prev, ...account.info() }))
    // console.log('account.update.loading:', account.info().loading)
  }, [])

  React.useEffect(() => {
    new Account(update).auth()
  }, [])

  return state
}
