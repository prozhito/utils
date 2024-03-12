import { API_URL, API_IMG } from '../constants'
import type { TImage } from '../types'
import { putData } from '../put'
import store from '../store'

const URL = `${API_URL}${API_IMG}`
const RAD = [0, 90, 180, 270]

type TDir = 'left' | 'right' | 'turn'
export type TUpdateCallback = ({ data, error }: { data?: TImage; error?: string }) => void

export function rotate(imgId: number, rotation: number, direction: TDir | string, callback: TUpdateCallback) {
  const angle = (() => {
    switch (direction) {
      case 'left':
        return left(rotation)
      case 'right':
        return right(rotation)
      case 'turn':
        return turn(rotation)
      default:
        return 0
    }
  })()

  if (angle instanceof Error) {
    callback({ error: `${angle.message}. Resetting to 0.` })
    request(imgId, 0, callback)
  } else {
    request(imgId, angle, callback)
  }
}

function request(imgId: number, angle: number, callback: TUpdateCallback) {
  const url = `${URL}${imgId}/`
  const body = JSON.stringify({ rotation: angle })
  putData<TImage>(url, body).then(({ data, error }) => {
    // console.log(data, error)
    if (data) {
      store.setImage({ id: imgId, data })
    }
    callback({ data, error })
  })
}

function left(rotation: number) {
  if (!RAD.includes(rotation)) return new Error(`Wrong rotation value: "${rotation}"`)
  const angle = rotation === 0 ? 270 : rotation - 90
  return angle
}

function right(rotation: number) {
  if (!RAD.includes(rotation)) return new Error(`Wrong rotation value: "${rotation}"`)
  const angle = rotation === 270 ? 0 : rotation + 90
  return angle
}

function turn(rotation: number) {
  if (!RAD.includes(rotation)) return new Error(`Wrong rotation value: "${rotation}"`)
  let angle = rotation + 180
  if (angle >= 360) angle -= 360
  return angle
}
