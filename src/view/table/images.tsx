import type { TImage } from '~/api/copy/types'
import * as Icon from '../ui/icons/rotate'

export function ParseImages(data: TImage[]) {
  const headers = ['order', 'img_250', 'rotation', 'original_filename', 'id', 'uuid', 'created_at']

  return (
    <>
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
          {data.map((item, i) => {
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

function tableCell(item: TImage, key: string) {
  switch (key) {
    case 'img_250': {
      return <img src={item.img_250} />
    }
    case 'rotation': {
      return (
        <>
          <p className="table__text">{item.rotation}</p>
          <Icon.RotateRight />
          <Icon.RotateLeft size={'2em'} />
          <Icon.ColumnHeight />
        </>
      )
    }
    default: {
      return item[key as keyof TImage]
    }
  }
}
