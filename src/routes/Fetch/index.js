import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'fetch',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Fetch = require('./containers/FetchContainer').default
      const reducer = require('./modules/fetch').default

      /*  Add the reducer to the store on key 'fetch'  */
      injectReducer(store, { key: 'fetch', reducer })

      /*  Return getComponent   */
      cb(null, Fetch)

    /* Webpack named bundle   */
    }, 'fetch')
  }
})
