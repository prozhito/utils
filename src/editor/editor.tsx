import React from 'react'
import { ParseTable } from './table/table'
import { ParseImages } from './table/images'
import { useGetPage } from '~/api/copy/useGetPage'
import { LittleSpinner } from '~/view/ui/spinner'
import { Pagination } from 'antd'

import styles from './.module.css'

function Editor({ id }: { id: number }) {
  const [page, setPage] = React.useState(0)
  const { loading, data, images, error } = useGetPage({ id, page })

  React.useEffect(() => {
    setPage(0)
  }, [id])

  return (
    <>
      {loading && (
        <div className={styles.message__loading}>
          <LittleSpinner />
          <span>Loading...</span>
        </div>
      )}
      {error && <p>{error}</p>}
      {data && <ParseTable data={data} />}
      {images && (
        <>
          <ParseImages data={images} />
          <Pagination current={page + 1} showSizeChanger={false} total={data?.images.length} onChange={page => setPage(page - 1)} />
        </>
      )}
    </>
  )
}

export default Editor
