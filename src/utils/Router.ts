export type TPageProps = Record<string, string | number | boolean>

class Route {
  public _pathname: string
  public _page: (props?: TPageProps) => void
  protected _block: boolean

  constructor(pathname: string, page: () => void) {
    this._pathname = pathname
    this._page = page
    this._block = false
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  public leave() {
    if (this._block) {
      // console.log('== Route leaved: ', this._pathname);
      // this._block.hide();
    }
  }

  public match(pathname: string) {
    return pathname == this._pathname
  }

  public render(props?: TPageProps) {
    // if (!this._block) {
    // console.log('== Route: ', this._pathname)
    this._block = true
    this._page(props)
    return
    // }
    // console.log('== Show without render:', this._pathname)
  }
}

class Router {
  private history: History = window.history
  private routes: Route[] = []
  protected _currentRoute: Route | null = null
  protected _rootQuery: string = '/'
  protected static _instance: Router

  constructor(rootQuery = '/') {
    if (Router._instance) return Router._instance
    this._rootQuery = rootQuery
    Router._instance = this
  }

  public use(pathname: string, page: (props?: TPageProps) => void) {
    const route = new Route(pathname, page)
    this.routes.push(route)
    return this
  }

  public start() {
    window.onpopstate = (event?: Event) => {
      if (event) event.preventDefault()
      this._popstateHandler()
    }
    this._popstateHandler()
  }

  private _popstateHandler = () => {
    if (window.location.pathname.length > 1) {
      this._onRoute(window.location.pathname)
      return
    }
    if (window.location.search) {
      const [pathname, param] = window.location.search.split('=')
      const props: TPageProps = { [pathname.substring(1)]: param }
      this._onRoute(pathname, props)
      return
    }
    this._onRoute('/')
  }

  private _onRoute(pathname: string, props?: TPageProps) {
    let route: Route | null = this.getRoute(pathname)
    if (!route) route = this.getRoute('/404')
    if (route) {
      if (this._currentRoute) this._currentRoute.leave()
      this._currentRoute = route
      route.render(props)
    }
  }

  public go(pathname: string) {
    this.history.pushState({ route: pathname }, '', pathname)
    if (pathname.charAt(0) === '?') {
      const [path, param] = pathname.split('=')
      const props: TPageProps = { [path.substring(1)]: param }
      this._onRoute(path, props)
      return
    }
    this._onRoute(pathname)
  }

  public back() {
    this.history.back()
    // console.log(this.history.state.route);
    // const route:Route | null=this.getRoute(this.history.state.route);
    // if(route) this._currentRoute=route;
  }

  public forward() {
    this.history.forward()
    // const route:Route | null=this.getRoute(this.history.state.route);
    // if(route) this._currentRoute=route;
  }

  public getRoute(pathname?: string) {
    if (pathname) return this.routes.find(route => route.match(pathname)) || null
    return this._currentRoute
  }
}

const router = new Router()
export default router
