import { UserMenu } from '../user/menu'

export function Header() {
  return (
    <header className="header">
      <div className="logo__links">
        <a href="/">
          <img src="./logo/prozhito_logo_ru.svg" height="30" alt="Logo" />
        </a>
        <a href="https://eusp.org/" target="_blank">
          <img src="./logo/eusp_logo_ru.svg" height="30" alt="Logo" />
        </a>
      </div>
      <h1 className="header__title">Utils</h1>
      <UserMenu />
    </header>
  )
}
