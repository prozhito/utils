import React from 'react'
import Editor from './editor/editor'
import { Button, message, Space } from 'antd'

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [id, setId] = React.useState(14322)
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
      setId(Number(el.value))
    }
  }, [])

  const slideItemHandler = (direction: number) => {
    setId(prev => {
      if (inputRef.current) inputRef.current.value = (prev + direction).toString()
      return id + direction
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

      <Editor id={id} />
    </>
  )
}

export default App
