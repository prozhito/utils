import React from 'react'
import { useGetProcessing, useGetImages } from './api/useGetData'
import { ParseTable } from './view/table/table'
import { ParseImages } from './view/table/images'

function App() {
  const [item, setItem] = React.useState(8826)
  // const [page, setPage] = React.useState(0)
  const page = 0
  const { loading: copyLoading, data: copyData, error: copyError } = useGetProcessing({ item })
  const { loading: imagesLoading, data: imagesData } = useGetImages({ items: copyData ? copyData.images : [], page })

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
        Select item id <input type="text" defaultValue={item} onKeyDown={changeItemHandler} />
      </label>
      {copyLoading && <p>Loading...</p>}
      {copyError && <p>{copyError}</p>}
      {copyData && <>{ParseTable(copyData)}</>}
      {imagesLoading && <p>Loading...</p>}
      {imagesData && <>{ParseImages(imagesData)}</>}
    </>
  )
}

export default App
