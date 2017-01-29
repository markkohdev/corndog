import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'generate',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const GeneratePlaylist = require('./containers/GeneratePlaylistContainer').default
      const reducer = require('./modules/generate-playlist').default

      /*  Add the reducer to the store on key 'GeneratePlaylist'  */
      injectReducer(store, { key: 'GeneratePlaylist', reducer })

      /*  Return getComponent   */
      cb(null, GeneratePlaylist)

    /* Webpack named bundle   */
    }, 'GeneratePlaylist')
  }
})
