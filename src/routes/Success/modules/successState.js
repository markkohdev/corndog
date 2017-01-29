import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const FEATURES_SLIDER_CHANGED = "FEATURES_SLIDER_CHANGED";
export const FEATURES_GO_NEXT_FEATURE = "FEATURES_GO_NEXT_FEATURE";
export const FEATURES_GO_PREV_FEATURE = "FEATURES_GO_PREV_FEATURE";
export const FEATURES_GENERATE_PLAYLISTS = "FEATURES_GENERATE_PLAYLISTS";

// ------------------------------------
// Actions
// ------------------------------------

export function successSliderChanged(value, successType) {
  return (dispatch, getState) => {
    dispatch({
      type: FEATURES_SLIDER_CHANGED,
      payload: {
        value,
        successType
      }
    });
  }
}

export function navigatedToNextFeature() {
  return {
    type: FEATURES_GO_NEXT_FEATURE,
  }
}

export function navigatedToPrevFeature() {
  return {
    type: FEATURES_GO_PREV_FEATURE,
  }
}

export function generatePlaylists() {
  return (dispatch, getState) => {
    browserHistory.push('/generate');

    dispatch({
      type: FEATURES_GENERATE_PLAYLISTS,
    });
  }
}

export const actions = {
  successSliderChanged,
  navigatedToNextFeature
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FEATURES_SLIDER_CHANGED] : (state, action) => {
    const { successType, value } = action.payload;
    return {
      ...state,
      allSuccess: {
        ...state.allSuccess,
        [successType]: value
      }
    }
  },
  [FEATURES_GO_NEXT_FEATURE] : (state, action) => {
    const { currentFeatureIndex, allSuccess} = state;
    const nextIndex = state.currentFeatureIndex + 1;
    return {
      ...state,
      currentFeatureIndex: nextIndex,
      currentFeature: {
        type: allSuccess[nextIndex]
      }
    }
  },
  [FEATURES_GO_PREV_FEATURE] : (state, action) => {
    const { currentFeatureIndex, allSuccess} = state;
    const nextIndex = state.currentFeatureIndex - 1;
    return {
      ...state,
      currentFeatureIndex: nextIndex,
      currentFeature: {
        type: allSuccess[nextIndex]
      }
    }
  }
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
