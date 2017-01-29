import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_API_CALLED = 'FETCH_API_CALLED'
export const FETCH = 'FETCH_MATRIX_STORED'
export const REDIRECT_TO_FEATURES = 'REDIRECT_TO_FEATURES'

// ------------------------------------
// Actions
// ------------------------------------
export function calledApi() {
  const value = ['I','CAN','MAKE','THIS','WORK'];
  return {
    type: FETCH_API_CALLED,
    payload: value
  }
}

export function redirectToFeatures() {
  browserHistory.push('/')
  return {
    type: REDIRECT_TO_FEATURES
  }
}

export const actions = {
  calledApi,
  redirectToFeatures
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_API_CALLED] : (state, action) => { 
    return {
      ...state,
      songList:action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  songList: ['OMG']
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
