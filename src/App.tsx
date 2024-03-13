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

function App() {
  const [{ route, props }, setRoute] = React.useState<TState>(defaultRoute)

  React.useEffect(() => {
    const routes = {
      selector: () => setRoute({ route: 'selector' }),
      editor: (props?: TPageProps) => setRoute({ route: 'editor', props }),
      '404': () => setRoute({ route: '404' }),
    }

    router.use('/', routes.selector).use('?copy_id', routes.editor).use('/404', routes['404']).start()
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
