import React from 'react'
import { useUser } from '~/api/account'
import router, { type TPageProps } from './utils/Router'
import DigitalCopySelector from './editor/main'
import Editor from './editor/editor'
import { NotFoundPage } from './view/404/404'

type TRoute = 'selector' | 'editor' | 'login' | '404' | null
type TState = {
  route: TRoute
  props?: TPageProps
}
const defaultRoute: TState = { route: null }
const defaultDigitalCopyId = 14322

const setTitle = (text: string) => {
  const title = document.querySelector('.header__title')
  if (title) title.textContent = text
}

function App() {
  const { loading, user } = useUser()
  const [{ route, props }, setRoute] = React.useState<TState>(defaultRoute)

  const routes = {
    selector: () => {
      setTitle('Utils')
      setRoute({ route: 'selector' })
    },
    editor: (props?: TPageProps) => {
      setTitle('Editor')
      setRoute({ route: 'editor', props })
    },
    login: () => {
      setTitle('Account')
      setRoute({ route: 'login' })
    },
    '404': () => {
      setTitle('404')
      setRoute({ route: '404' })
    },
  }

  React.useEffect(() => {
    router
      .use('/', routes.selector)
      .use('/utils', routes.selector)
      .use('/utils/', routes.selector)
      .use('/utils?copy_id', routes.editor)
      .use('/utils/?copy_id', routes.editor)
      .use('/?copy_id', routes.editor)
      .use('/login', routes.login)
      .use('/utils/login', routes.login)
      .use('/404', routes['404'])
  }, [])

  React.useEffect(() => {
    // console.log({ loading, user })
    if (!loading) router.start()
  }, [loading])

  switch (route) {
    case 'selector': {
      if (!user) {
        setTitle('Account')
        setRoute({ route: 'login' })
        return null
      }
      return <DigitalCopySelector />
    }
    case 'editor': {
      if (!user) {
        setTitle('Account')
        setRoute({ route: 'login' })
        return null
      }
      return <Editor id={props ? Number(props.copy_id) : defaultDigitalCopyId} />
    }
    case '404':
      return <NotFoundPage />
    default:
      return null
  }
}

export default App
