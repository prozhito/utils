import React from 'react'
import { useGetPage } from './api/useGetPage'
import { ParseTable } from './view/table/table'
import { ParseImages } from './view/table/images'

function App() {
  const [id, setItem] = React.useState(8826)
  // const [page, setPage] = React.useState(0)
  const page = 0
  const { loading, data, images, error } = useGetPage({ id, page })

  const changeItemHandler: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(event => {
    if (event.key === 'Enter') {
      const el = event.target as HTMLInputElement
      el.blur()
      setItem(Number(el.value))
    }
  }, [])

  return (
    <>
      <label>
        Select item id <input type="text" defaultValue={id} onKeyDown={changeItemHandler} />
      </label>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <>{ParseTable(data)}</>}
      {images && <>{ParseImages(images)}</>}
    </>
  )
}

export default App
