import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const FEATURES_SLIDER_CHANGED = "FEATURES_SLIDER_CHANGED";
export const FEATURES_GO_NEXT_FEATURE = "FEATURES_GO_NEXT_FEATURE";
export const FEATURES_GO_PREV_FEATURE = "FEATURES_GO_PREV_FEATURE";
export const FEATURES_GENERATE_PLAYLISTS = "FEATURES_GENERATE_PLAYLISTS";
export const FEATURES_GO_TO_INDEX = "FEATURES_GO_TO_INDEX";

// ------------------------------------
// Actions
// ------------------------------------

export function featureSliderChanged(value, featureType) {
  return (dispatch, getState) => {
    dispatch({
      type: FEATURES_SLIDER_CHANGED,
      payload: {
        value,
        featureType
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

export function goToIndex(index) {
  return {
    type: FEATURES_GO_TO_INDEX,
    payload: {
      index
    }
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
  featureSliderChanged,
  navigatedToNextFeature
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FEATURES_SLIDER_CHANGED] : (state, action) => {
    const { featureType, value } = action.payload;
    return {
      ...state,
      allFeatures: {
        ...state.allFeatures,
        [featureType]: value
      }
    }
  },
  [FEATURES_GO_NEXT_FEATURE] : (state, action) => {
    const { currentFeatureIndex, allFeatures} = state;
    const nextIndex = state.currentFeatureIndex + 1;
    return {
      ...state,
      currentFeatureIndex: nextIndex,
      currentFeature: {
        type: allFeatures[nextIndex]
      }
    }
  },
  [FEATURES_GO_PREV_FEATURE] : (state, action) => {
    const { currentFeatureIndex, allFeatures} = state;
    const nextIndex = state.currentFeatureIndex - 1;
    return {
      ...state,
      currentFeatureIndex: nextIndex,
      currentFeature: {
        type: allFeatures[nextIndex]
      }
    }
  },
  [FEATURES_GO_TO_INDEX] : (state, action) => {
    const { currentFeatureIndex, allFeatures} = state;
    const { index } = action.payload;
    return {
      ...state,
      currentFeatureIndex: index,
      currentFeature: {
        type: allFeatures[index]
      }
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  allFeatures: {
    'danceability': 50,
    'liveness': 50,
    'acousticness': 50,
    'instrumentalness': 50,
    'speechiness': 50,
    'valence': 50
  },
  currentFeatureIndex: 0
}
export default function featureReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
