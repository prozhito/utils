import React from 'react'
import store from './store'
import type { TCopy, TImage } from './types'

type TPageState = {
  loading: boolean
  data?: TCopy
  images?: TImage[]
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
      setState({ loading: true })
      store.updatePage({ id, page }, ({ data, images }) => {
        setState({ loading: false, data, images })
      })
    }
  }, [id, page])

  return { loading: state.loading, data: state.data, images: state.images, error: state.error }
}
