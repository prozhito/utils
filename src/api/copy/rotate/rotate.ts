import { API_URL, API_IMG } from '../constants'
import type { TImage, TUpdateCallback } from '../types'
import { putData } from '../put'
import store from '../store'

const URL = `${API_URL}${API_IMG}`
const RAD = [0, 90, 180, 270]

type TDir = 'left' | 'right' | 'turn'

export function rotate(imgId: number, rotation: number, direction: TDir | string, callback: TUpdateCallback<TImage>) {
  if (!RAD.includes(rotation)) {
    const message = `Wrong rotation value: "${rotation}"`
    callback({ error: `${message}. Resetting to 0.` })
    request(imgId, 0, callback)
    return new Error(message)
  }

  const angle = () => {
    switch (direction) {
      case 'left':
        return rotation === 0 ? 270 : rotation - 90
      case 'right':
        return rotation === 270 ? 0 : rotation + 90
      case 'turn': {
        let angle = rotation + 180
        if (angle >= 360) angle -= 360
        return angle
      }
      default:
        return 0
    }
  }

  request(imgId, angle(), callback)
}

function request(imgId: number, angle: number, callback: TUpdateCallback<TImage>) {
  const url = `${URL}${imgId}/`
  const body = JSON.stringify({ rotation: angle })
  putData<TImage>(url, body, true).then(({ data, error }) => {
    // console.log(data, error)
    if (data) {
      store.setImage({ id: imgId, data })
    }
    callback({ data, error })
  })
}
