import React from 'react'
import { useGetPage } from './api/copy/useGetPage'
import { ParseTable } from './view/table/table'
import { ParseImages } from './view/table/images'
import { LittleSpinner } from './view/ui/spinner'
import { Pagination } from 'antd'
import { Button, message, Space } from 'antd'

type TPageProps = { id: number; page: number }

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [{ id, page }, setPage] = React.useState<TPageProps>({ id: 14322, page: 0 })
  const { loading, data, images, error } = useGetPage({ id, page })
  const [messageApi, contextHolder] = message.useMessage()

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    })
  }

  const changeItemHandler: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(event => {
    if (event.key === 'Enter') {
      const el = event.target as HTMLInputElement
      el.blur()
      setPage({ id: Number(el.value), page: 0 })
    }
  }, [])

  const slideItemHandler = (direction: number) => {
    setPage(prev => {
      if (inputRef.current) inputRef.current.value = (prev.id + direction).toString()
      return { id: prev.id + direction, page: 0 }
    })
  }

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={success}>Success</Button>
      </Space>
      <label>
        <span>Select item id </span>
        <button className="pagination__btn" onClick={() => slideItemHandler(-1)}>
          {'\u003c'}
        </button>
        <input className="pagination__val" ref={inputRef} type="text" maxLength={5} defaultValue={id} onKeyDown={changeItemHandler} />
        <button className="pagination__btn" onClick={() => slideItemHandler(1)}>
          {'\u003e'}
        </button>
      </label>
      {loading && (
        <>
          <LittleSpinner />
          <span>Loading...</span>
        </>
      )}
      {error && <p>{error}</p>}
      {data && <>{ParseTable(data)}</>}
      {images && (
        <>
          {ParseImages(images)}
          <Pagination
            current={page + 1}
            showSizeChanger={false}
            total={data?.images.length}
            onChange={page => setPage(prev => ({ id: prev.id, page: page - 1 }))}
          />
        </>
      )}
    </>
  )
}

export default App
