import { browserHistory } from 'react-router'
import cookie from 'react-cookie';
const SpotifyWebApi = require('spotify-web-api-js');

// ------------------------------------
// Constants
// ------------------------------------
export const GENERATE_SIMILARITIES = 'GENERATE_SIMILARITIES'
export const GENERATE_PLAYLIST = 'GENERATE_PLAYLIST'
export const REDIRECT_TO_SUCCESS = 'REDIRECT_TO_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

function cosineSimilarity(a, b) {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += Math.pow(a[i], 2);
      normB += Math.pow(b[i], 2);
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function generateSimilarities(allFeatures, songList, features, minMax, FEATURES) {
  // Build our preference vector
  const preferenceVector = [];
  FEATURES.forEach(function(featureKey) {
    // Weight the value
    const weightedPreferenceValue = allFeatures[featureKey] / 100.0;

    // Then push it to the preferenceVector
    preferenceVector.push(weightedPreferenceValue);
  });

  const similarities = [];
  for(let i=0; i<features.length; i++) {
    const featureRow = features[i];
    const track = songList[i];

    // Todo: calculate cosine similarity
    const cosine = cosineSimilarity(preferenceVector, featureRow);
    const similarityObject = {
      trackFeatures: featureRow,
      track: track,
      cosine: cosine
    }
    similarities.push(similarityObject);
  }

  console.log('SIMS', similarities);

  return {
    type: GENERATE_SIMILARITIES,
    payload: {
      similarities
    }
  }
}

export function generatePlaylist(similarities) {
  const orderedTrackIds = [];

  return {
    type: GENERATE_PLAYLIST,
    payload: {
      playlistTracks: orderedTrackIds
    }
  }
}

export function redirectToSuccess() {
  browserHistory.push('/success')

  return {
    type: REDIRECT_TO_SUCCESS
  }
}

export const actions = {
  generateSimilarities,
  generatePlaylist,
  redirectToSuccess
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GENERATE_SIMILARITIES] : (state, action) => {
    const { similarities } = action.payload;
    return {
      ...state,
      similarities
    }
  },
  [GENERATE_PLAYLIST] : (state, action) => {
    const { playlistTracks } = action.payload;
    return {
      ...state,
      playlistTracks
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  playlistTracks: [],
  similarities: []
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
