import { combineReducers } from 'redux'
import locationReducer from './location'
import featuresReducer from 'routes/Features/modules/featuresState'
import fetchReducer from 'routes/Fetch/modules/fetch'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    features: featuresReducer,
    fetch: fetchReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
