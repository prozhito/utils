import { authWithToken } from './actions/auth'
import { authWithCredentials } from './actions/login'
import { setCookie, getLifespan } from './utils'

export class Account {
  static _instance: Account
  private _user: Record<string, string> | null = null
  private _loading = true
  private _error = ''
  static _updateCallback: (() => void)[] = []

  constructor(updateCallback?: () => void) {
    if (updateCallback) Account._updateCallback.push(updateCallback)
    if (Account._instance) return Account._instance
    Account._instance = this

    this.auth = this.auth.bind(this)
    this.login = this.login.bind(this)
    this.info = this.info.bind(this)
    this.logout = this.logout.bind(this)
  }

  public set user(data: Record<string, string>) {
    const { access } = data
    if (access) {
      delete data.access
      setCookie({
        access,
        expires: getLifespan(1),
        samesite: 'lax',
      })
    }
    this._user = { ...data }
  }

  private emitUpdate() {
    Account._updateCallback.forEach(callback => {
      if (callback) callback()
    })
  }

  public async auth(access: string = '', refresh: string = '') {
    this._loading = true
    this._error = ''
    this._user = null
    this.emitUpdate()

    return authWithToken(access, refresh).then(res => {
      // console.log(res)
      if (!res || !res.error) this._user = { ...res.user }
      else this._error = res.error
      this._loading = false
      this.emitUpdate()
      return res
    })
  }

  public login(data: Record<string, string>) {
    this._loading = true
    this._error = ''
    this._user = null
    this.emitUpdate()

    authWithCredentials(data).then(res => {
      // console.log(res)
      if (!res || !res.error) this._user = { ...res.user }
      else this._error = res.error
      this._loading = false
      this.emitUpdate()
    })
  }

  public logout() {
    console.log('logout')
    if (typeof document !== 'undefined') {
      document.cookie = 'access= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'refresh= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    }
    this._error = ''
    this._user = null
    this.emitUpdate()
  }

  public info() {
    return { loading: this._loading, error: this._error, user: this._user }
  }
}
