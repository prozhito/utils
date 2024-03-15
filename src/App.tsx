import React from 'react'
import router, { type TPageProps } from './utils/Router'
import DigitalCopySelector from './editor/main'
import Editor from './editor/editor'
import { NotFoundPage } from './view/404/404'

type TRoute = 'selector' | 'editor' | '404' | null
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
  const [{ route, props }, setRoute] = React.useState<TState>(defaultRoute)

  React.useEffect(() => {
    const routes = {
      selector: () => {
        setTitle('Utils')
        setRoute({ route: 'selector' })
      },
      editor: (props?: TPageProps) => {
        setTitle('Editor')
        setRoute({ route: 'editor', props })
      },
      '404': () => {
        setTitle('404')
        setRoute({ route: '404' })
      },
    }

    router
      .use('/', routes.selector)
      .use('/utils', routes.selector)
      .use('/utils/', routes.selector)
      .use('/utils?copy_id', routes.editor)
      .use('/utils/?copy_id', routes.editor)
      .use('/?copy_id', routes.editor)
      .use('/404', routes['404'])
      .start()
  }, [])

  switch (route) {
    case 'selector':
      return <DigitalCopySelector />
    case 'editor':
      return <Editor id={props ? Number(props.copy_id) : defaultDigitalCopyId} />
    case '404':
      return <NotFoundPage />
    default:
      return null
  }
}

export default App
