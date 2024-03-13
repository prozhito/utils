import router from '~/utils/Router'
import styles from './.module.css'

export const NotFoundPage = () => {
  return (
    <div className={styles.page__404}>
      <h1>(404) Page not found</h1>
      <div className={styles.page__404_link} onClick={() => router.go('/utils')}>
        {'\u2190'} Go back
      </div>
    </div>
  )
}
