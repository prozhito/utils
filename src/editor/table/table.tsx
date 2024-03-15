import React from 'react'
import store from '~/api/copy/store'
import { objectKeys } from '~/utils/types'
import type { TCopy, TCopyStatus } from '~/api/copy/types'
import { setCopyStatus } from '~/api/copy/status/status'
import { message, Select } from 'antd'
import { formatBytes } from '~/utils/format'

import './styles.css'

type TTableKey = Exclude<keyof TCopy, 'item' | 'item_id' | 'is_main' | 'images'>
type TTableView = Record<TTableKey, string>
const tableView: TTableView = {
  item_title: 'Документ',
  id: 'id копии',
  other_copies_of_this_item: 'Другие копии документа',
  images_count: 'Кол-во изображений',
  total_size: 'Суммарный размер',
  source_type: 'Источник',
  method: 'Метод',
  status: 'Статус',
  tags: 'Теги',
  notes: 'Примечания',
  date: 'Дата оцифровки',
  zip: 'zip',
  zip_preview: 'zip_preview',
}

const isBlank = (value: unknown) => {
  if (typeof value === 'boolean' && !value) return true
  if (value === null || value === undefined || value === '') return true
  if (Array.isArray(value) && !value.length) return true
  return false
}

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
          {objectKeys(tableView).map((key, i) => {
            if (isBlank(data[key])) return null
            if (key === 'status') {
              return (
                <tr key={i}>
                  <td>{tableView[key]}</td>
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
            if (key === 'total_size') {
              return (
                <tr key={i}>
                  <td>{tableView[key]}</td>
                  <td>{formatBytes(data[key])}</td>
                </tr>
              )
            }
            return (
              <tr key={i}>
                <td>{tableView[key]}</td>
                <td>{data[key]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
