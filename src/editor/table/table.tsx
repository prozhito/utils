import React from 'react'
import store from '~/api/copy/store'
import { objectKeys } from '~/utils/types'
import type { TCopy, TCopyStatus } from '~/api/copy/types'
import { setCopyStatus } from '~/api/copy/status/status'
import { message, Select } from 'antd'

import './styles.css'

export const ParseTable: React.FC<{ data: TCopy }> = ({ data }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [statusValues, setStatusValues] = React.useState<TCopyStatus[]>([])

  React.useEffect(() => {
    store.getStatusValues().then(data => setStatusValues(data))
  }, [])

  const handleStatusChange = (value: number) => {
    setCopyStatus({ id: data.id, status: value }, ({ error }) => {
      if (error) {
        messageApi.open({
          type: 'error',
          content: error,
        })
      } else {
        messageApi.open({
          type: 'success',
          content: 'Status was successfuly changed.',
        })
      }
    })
  }

  return (
    <>
      {contextHolder}
      <h3>Copy</h3>
      <table className="table__copy">
        <tbody className="table__copy_body">
          {objectKeys(data).map((key, i) => {
            if (key === 'status') {
              return (
                <tr key={i}>
                  <td>{key as string}</td>
                  <td>
                    <Select
                      defaultValue={data[key]}
                      onChange={handleStatusChange}
                      options={statusValues.map(obj => ({ value: obj.id, label: obj.title }))}
                      popupMatchSelectWidth={false}
                    />
                  </td>
                </tr>
              )
            }
            if (key !== 'images') {
              return (
                <tr key={i}>
                  <td>{key as string}</td>
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
