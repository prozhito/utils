import { API_URL, API_COPY, API_IMG } from './constants'
import type { TCopy, TImage } from './types'
import { getData } from './get'

type TUpdateCallback = ({ data, images, error }: { data: TCopy | null; images: TImage[]; error?: string }) => void

class Store {
  private _copy: Record<string, TCopy> = {}
  private _image: Record<string, TImage> = {}

  getCopy({ id, page }: { id?: number; page?: number }) {
    return new Promise<TCopy>((resolve, reject) => {
      if (id != undefined) {
        if (this._copy[id]) resolve(this._copy[id])

        let url = `${API_URL}${API_COPY}${id ?? ''}/`
        if (page !== undefined) url = `${url}?page=${page}`
        // console.log('Fetching copy: ', url)
        getData<TCopy>(url, true).then(response => {
          if (response.data) {
            this._copy[id] = response.data
            resolve(this._copy[id])
          } else reject(response.error)
        })
      }
    })
  }

  getImage({ id }: { id?: number }) {
    return new Promise<TImage>((resolve, reject) => {
      if (id != undefined) {
        if (this._image[id]) {
          resolve(this._image[id])
          return
        }

        const url = `${API_URL}${API_IMG}${id}/`
        // console.log('Fetching image: ', url)
        getData<TImage>(url).then(response => {
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
          const ids = items.slice(page * 10, page * 10 + 10)
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
