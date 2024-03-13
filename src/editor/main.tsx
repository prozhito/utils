import React from 'react'
import router from '~/utils/Router'
// import Editor from './editor'

const defaultDigitalCopyId = 14322

function DigitalCopySelector() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  // const [id, setId] = React.useState(defaultDigitalCopyId)
  const id = defaultDigitalCopyId

  const changeItemHandler: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(event => {
    if (event.key === 'Enter') {
      const el = event.target as HTMLInputElement
      el.blur()
      // setId(Number(el.value))
      router.go(`/utils?copy_id=${el.value}`)
    }
  }, [])

  const slideItemHandler = (direction: number) => {
    /*     setId(prev => {
      if (inputRef.current) inputRef.current.value = (prev + direction).toString()
      return id + direction
    }) */
    router.go(`/utils?copy_id=${id + direction}`)
  }

  return (
    <>
      <label>
        <span>Select item id </span>
        <button className="pagination__btn" onClick={() => slideItemHandler(-1)}>
          {'\u003c'}
        </button>
        &nbsp;
        <input className="pagination__val" ref={inputRef} type="text" maxLength={5} defaultValue={id} onKeyDown={changeItemHandler} />
        &nbsp;
        <button className="pagination__btn" onClick={() => slideItemHandler(0)}>
          Go
        </button>
        &nbsp;
        <button className="pagination__btn" onClick={() => slideItemHandler(1)}>
          {'\u003e'}
        </button>
      </label>

      {/* <Editor id={id} /> */}
    </>
  )
}

export default DigitalCopySelector
