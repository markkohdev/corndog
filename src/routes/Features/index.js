import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'features',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Feature = require('./containers/FeaturesContainer').default
      const reducer = require('./modules/features').default

      /*  Add the reducer to the store on key 'feature'  */
      injectReducer(store, { key: 'features', reducer })

      /*  Return getComponent   */
      cb(null, Feature)

    /* Webpack named bundle   */
    }, 'features')
  }
})
