import { API_URL, API_COPY, API_IMG, API_STATUS } from './constants'
import type { TCopyInfo, TImageInfo, TCopyStatus, TCopyStatusResponse } from './types'
import { getData } from './get'

type TUpdateCallback = ({ data, images, error }: { data: TCopyInfo | null; images: TImageInfo[]; error?: string }) => void

class Store {
  private _copy: Record<string, TCopyInfo> = {}
  private _image: Record<string, TImageInfo> = {}
  private _statusValues: TCopyStatus[] = []

  setCopy({ id, data }: { id: number; data: TCopyInfo }) {
    this._copy[id] = data
  }

  getStatusValues() {
    return new Promise<TCopyStatus[]>((resolve, reject) => {
      if (this._statusValues.length) resolve(this._statusValues)

      const url = `${API_URL}${API_STATUS}`
      // console.log('Fetching statusValues: ', url)
      getData<TCopyStatusResponse>(url, true).then(response => {
        if (response.data) {
          this._statusValues = response.data.results
          resolve(this._statusValues)
        } else reject(response.error)
      })
    })
  }

  getCopy({ id, page }: { id?: number; page?: number }) {
    return new Promise<TCopyInfo>((resolve, reject) => {
      if (id != undefined) {
        if (this._copy[id]) resolve(this._copy[id])

        let url = `${API_URL}${API_COPY}${id ?? ''}/`
        if (page !== undefined) url = `${url}?page=${page}`
        // console.log('Fetching copy: ', url)
        getData<TCopyInfo>(url, true).then(response => {
          if (response.data) {
            this._copy[id] = response.data
            resolve(this._copy[id])
          } else reject(response.error)
        })
      }
    })
  }

  setImage({ id, data }: { id: number; data: TImageInfo }) {
    this._image[id] = data
  }

  getImage({ id }: { id?: number }) {
    return new Promise<TImageInfo>((resolve, reject) => {
      if (id != undefined) {
        if (this._image[id]) {
          resolve(this._image[id])
          return
        }

        const url = `${API_URL}${API_IMG}${id}/`
        // console.log('Fetching image: ', url)
        getData<TImageInfo>(url, true).then(response => {
          if (response.data) {
            this._image[id] = response.data
            resolve(this._image[id])
          } else {
            this._image[id] = {
              id,
              uuid: '',
              copy: 0,
              order: 0,
              original_filename: '',
              created_at: '',
              img_250: '',
              rotation: 0,
              error: response.error ?? '',
            }
            reject(response.error)
          }
        })
      }
    })
  }

  updatePage({ id, page = 0 }: { id?: number; page?: number }, updateCallback: TUpdateCallback) {
    this.getCopy({ id })
      .then(data => {
        const items = data.images
        if (items) {
          // const ids = items.slice(page * 10, page * 10 + 10)
          const ids = items.slice(0, page * 10 + 10)
          const arr = ids.map(id => this.getImage({ id }))
          Promise.allSettled(arr).finally(() => {
            const images = ids.map(id => this._image[id])
            updateCallback({ data, images })
          })
        }
      })
      .catch(error => {
        updateCallback({ data: null, images: [], error })
      })
  }
}

const store = new Store()
export default store
