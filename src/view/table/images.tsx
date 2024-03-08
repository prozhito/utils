import type { TImage } from '~/api/copy/types'

export function ParseImages(data: TImage[]) {
  const headers = ['img_250', 'id', 'uuid', 'copy', 'order', 'rotation', 'original_filename', 'created_at']

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
          {data.map((item, i) => (
            <tr key={`r${i}`}>
              {headers.map((key, i) => (
                <td key={`d${i}`}>{key === 'img_250' ? <img src={item[key as keyof TImage].toString()} /> : item[key as keyof TImage]}</td>
                // <td key={`d${i}`}>{key === 'img_250' ? 'img' : item[key as keyof TImage]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
