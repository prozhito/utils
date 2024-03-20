import React from 'react'
import { API_URL, API_COPY, API_IMG } from './constants'
import type { TCopyInfo, TImageInfo } from './types'
import { getData } from './get'

type TProcessingState<T> = {
  loading: boolean
  data?: T
  error?: string
}

type TGetProcessingProps = {
  item?: number
  page?: number
}

export const useGetProcessing = ({ item, page }: TGetProcessingProps) => {
  const [state, setState] = React.useState<TProcessingState<TCopyInfo>>({ loading: true })

  React.useEffect(() => {
    let url = `${API_URL}${API_COPY}${item ?? ''}`
    if (page !== undefined) url = `${url}?page=${page}`
    console.log('Fetching: ', url)
    getData<TCopyInfo>(url).then(response => {
      setState({ loading: false, ...response })
    })
  }, [item, page])

  return { loading: state.loading, data: state.data, error: state.error }
}

type TImagesState<T> = {
  loading: boolean
  data?: T[]
  error?: string
}

type TGetImagesProps = {
  items?: number[]
  page?: number
}

export const useGetImages = ({ items, page }: TGetImagesProps) => {
  const [state, setState] = React.useState<TImagesState<TImageInfo>>({ loading: true })

  React.useEffect(() => {
    if (items) {
      const url = `${API_URL}${API_IMG}`
      const ids = page !== undefined && page * 10 < items.length ? items.slice(page * 10, page * 10 + 10) : items.slice(0, 10)
      const arr = ids.map(id => getData<TImageInfo>(`${url}${id}`))
      Promise.all(arr).then(response => {
        setState({ loading: false, data: response.map(item => item.data!) })
      })
    }
  }, [items, page])

  return { loading: state.loading, data: state.data, error: state.error }
}
