import React from 'react'
import type { TImage } from '~/api/copy/types'
import { RotateButton } from './ui/rotate'
import { rotate, type TUpdateCallback } from '~/api/copy/rotate/rotate'
import { message } from 'antd'

export const ParseImages: React.FC<{ data: TImage[] }> = ({ data }) => {
  const headers = ['order', 'img_250', 'rotation', 'original_filename', 'id', 'uuid', 'created_at']
  const [images, setImages] = React.useState<TImage[]>(data)
  const [messageApi, contextHolder] = message.useMessage()
  const lock: HTMLDivElement[] = []

  const updateCallback: TUpdateCallback = ({ data, error }) => {
    // console.log({ data, error })
    if (error) {
      messageApi.open({
        type: 'error',
        content: error,
      })
    }
    if (data) {
      setImages(prev => prev.map(item => (item.id === data.id ? data : item)))
    }
    while (lock.length) {
      const el = lock.pop()
      if (el) el.classList.remove('disabled')
    }
  }

  function tableCell(item: TImage, key: string) {
    const [id, rotation] = [item.id, item.rotation]
    const onClick: React.MouseEventHandler<HTMLDivElement> = event => {
      const el = event.target as HTMLDivElement
      const dir = el.getAttribute('data-dir')
      if (dir) {
        const block = event.currentTarget as HTMLDivElement
        block.classList.add('disabled')
        lock.push(block)
        rotate(id, rotation, dir, updateCallback)
      }
    }

    switch (key) {
      case 'img_250': {
        return <img src={item.img_250} className={`table__img_${rotation}`} />
      }
      case 'rotation': {
        return (
          <>
            <p className="table__text">{rotation}</p>
            <div className="table__rotate" onClick={onClick}>
              <RotateButton direction="left" />
              <RotateButton direction="turn" />
              <RotateButton direction="right" />
            </div>
          </>
        )
      }
      default: {
        return item[key as keyof TImage]
      }
    }
  }

  return (
    <>
      {contextHolder}
      <h3>Images</h3>
      <table className="table__images">
        <thead className="table__images_head">
          <tr>
            {headers.map((item, i) => (
              <td key={i}>{item}</td>
            ))}
          </tr>
        </thead>
        <tbody className="table__images_body">
          {images.map((item, i) => {
            if (!item) return null
            if (item.error)
              return (
                <tr key={`r${i}`}>
                  <td></td>
                  <td colSpan={6} className="table__error">
                    {item.error}
                  </td>
                </tr>
              )
            return (
              <tr key={`r${i}`}>
                {headers.map((key, i) => (
                  <td key={`d${i}`}>{tableCell(item, key)}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
/* 
const rotateClickHandler = event => {
  console.log(event.target, (event.target as HTMLDivElement).getAttribute('data-dir'))
}
 */
