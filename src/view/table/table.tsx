import { objectKeys } from '~/utils/types'
import type { TCopy } from '~/api/types'

import './styles.css'

export function ParseTable(data: TCopy) {
  return (
    <>
      <h3>Copy</h3>
      <table className="table__copy">
        <tbody className="table__copy_body">
          {objectKeys(data).map((key, i) => {
            if (key !== 'images') {
              return (
                <tr key={i}>
                  <td>{key}</td>
                  <td>{data[key]}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </>
  )
}
