import { browserHistory } from 'react-router'
import cookie from 'react-cookie';
const SpotifyWebApi = require('spotify-web-api-js');

// ------------------------------------
// Constants
// ------------------------------------
export const GENERATE_PLAYLIST = 'GENERATE_PLAYLIST'
export const REDIRECT_TO_SUCCESS = 'REDIRECT_TO_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

function cosineSimilarity(a, b) {

}

export function generatePlaylist(allFeatures, songList, features, minMax, FEATURES) {
  console.log('Prefernce Vector', allFeatures);
  console.log('Songz: ', songList);
  console.log('Features: ', features);

  // Build our preference vector
  const preferenceVector = [];
  FEATURES.forEach(function(featureKey) {
    // Weight the value

    // Then push it to the preferenceVector
    preferenceVector.push(allFeatures[feature])
  });

  const similarities = [];
  for(let i=0; i<features.length; i++) {
    const featureRow = features[i];
    const track = songList[i];
    // Todo: Scale the vector values from 0-1
    // Todo: calculate cosine similarity
  }

}

export function redirectToSuccess() {
  browserHistory.push('/success')

  return {
    type: REDIRECT_TO_SUCCESS
  }
}

export const actions = {
  generatePlaylist,
  redirectToSuccess
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
  playlistTracks: []
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
