import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'success',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Feature = require('./containers/SuccessContainer').default
      const reducer = require('./modules/successState').default

      /*  Add the reducer to the store on key 'success'  */
      injectReducer(store, { key: 'success', reducer })

      /*  Return getComponent   */
      cb(null, Feature)

    /* Webpack named bundle   */
    }, 'success')
  }
})
