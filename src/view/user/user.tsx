import styles from './.module.css'

type TFields = 'id' | 'email' | 'first_name' | 'last_name' | 'patronymic' | 'access' | 'refresh'
type TUserInfoProps = {
  loading?: boolean
  error?: string
  user?: Record<TFields, string> | null
}

const showFields: Partial<TFields>[] = ['email', 'first_name', 'last_name']

export const UserInfo = ({ user }: TUserInfoProps) => {
  if (!user) return null
  return (
    <table className={styles.user__info_table}>
      <tbody>
        {showFields.map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{user[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
