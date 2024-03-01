import React from 'react'
import { API_URL, API_COPY, API_IMG } from './constants'
import type { TProcessing, TImage } from './types'
import { getData } from './get'

type TState<T> = {
  loading: boolean
  data?: T
  error?: string
}

export const useGetProcessing = () => {
  const [state, setState] = React.useState<TState<TProcessing>>({ loading: true })
  const url = `${API_URL}${API_COPY}`

  getData<TProcessing>(url).then(response => {
    setState({ loading: false, ...response })
  })

  return { loading: state.loading, data: state.data, error: state.error }
}

export const useGetImage = () => {
  const [state, setState] = React.useState<TState<TImage>>({ loading: true })
  const url = `${API_URL}${API_IMG}`

  getData<TImage>(url).then(response => {
    setState({ loading: false, ...response })
  })

  return { loading: state.loading, data: state.data, error: state.error }
}
