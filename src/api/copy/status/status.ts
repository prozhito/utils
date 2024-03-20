import store from '../store'
import { putData } from '../put'
import { API_URL, API_COPY } from '../constants'
import type { TCopyInfo, TUpdateCallback } from '../types'

const URL = `${API_URL}${API_COPY}`

export const setCopyStatus = ({ id, status }: { id: number; status: number }, callback?: TUpdateCallback<TCopyInfo>) => {
  const url = `${URL}${id}/`
  const body = JSON.stringify({ status })
  putData<TCopyInfo>(url, body, true).then(({ data, error }) => {
    if (data) {
      store.setCopy({ id, data })
    }
    if (callback) callback({ data, error })
  })
}
