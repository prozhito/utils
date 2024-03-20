import React from 'react'
import store from './store'
import type { TCopyInfo, TImageInfo } from './types'

type TPageState = {
  loading: boolean
  data?: TCopyInfo
  images?: TImageInfo[]
  error?: string
}

type TGetPageProps = {
  id?: number
  page?: number
}

export const useGetPage = ({ id, page }: TGetPageProps) => {
  const [state, setState] = React.useState<TPageState>({ loading: true })

  React.useEffect(() => {
    if (id !== undefined) {
      setState(prev => ({ ...prev, loading: true }))
      store.updatePage({ id, page }, ({ data, images, error }) => {
        setState({
          loading: false,
          data: data || undefined,
          images: images.length ? images : undefined,
          error,
        })
      })
    }
  }, [id, page])

  return state
}
