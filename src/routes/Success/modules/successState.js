import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
// export const FEATURES_REDIRECT_HOME = "FEATURES_REDIRECT_HOME";

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  // redirectToHome
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  allSuccess: {
    'danceability': 50,
    'energy': 50,
    'liveness': 50,
    'acousticness': 50,
    'speechiness': 50,
    'valence': 50
  },
  currentFeatureIndex: 0
}
export default function successReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
