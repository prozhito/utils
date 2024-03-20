import React from 'react'
import { ParseTable } from './table/table'
import { ParseImages } from './table/images'
import { useGetPage } from '~/api/copy/useGetPage'
import { LittleSpinner } from '~/view/ui/spinner'
import { Button } from '~/view/ui'

import styles from './.module.css'

function Editor({ id }: { id: number }) {
  const [page, setPage] = React.useState(0)
  const { loading, data, images, error } = useGetPage({ id, page })
  const imgTotal = data ? data.images.length : 0
  const imgShown = Math.min((page + 1) * 10, imgTotal)

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
          <Button onClick={() => setPage(prev => prev + 1)} disabled={imgTotal < (page + 1) * 10} loading={loading}>
            {`Загрузить ещё (${imgShown}/${imgTotal})`}
          </Button>
        </>
      )}
    </>
  )
}

export default Editor
