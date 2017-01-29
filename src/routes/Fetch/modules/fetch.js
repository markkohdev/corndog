import { browserHistory } from 'react-router'
import cookie from 'react-cookie';
const SpotifyWebApi = require('spotify-web-api-js');

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_API_CALLED = 'FETCH_API_CALLED'
export const FETCH = 'FETCH_MATRIX_STORED'
export const REDIRECT_TO_FEATURES = 'REDIRECT_TO_FEATURES'

// ------------------------------------
// Actions
// ------------------------------------
export function calledApi(offset, songList = [], total) {
  return (dispatch, getState) => {
    const spotify = new SpotifyWebApi();
    const access_token = cookie.load('spotify_access_token');
    spotify.setAccessToken(access_token);
    // Get the first set of tracks so we can get the total
    spotify.getMySavedTracks({offset}).then(function(data) {
      // Update the total number of tracks (for pagination purposes)
      const total = data.total;
      const tracks = data.items;

      dispatch({
        type: FETCH_API_CALLED,
        payload: {
          tracks,
          total
        }
      })
    });
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
    let { offset, songList } = state;
    const { total, tracks } = action.payload;
    const newSonglist = songList.slice(0).concat(tracks);
    const newOffset = newSonglist.length;
    return {
      ...state,
      songList: newSonglist,
      offset: newOffset,
      total
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  songList: [],
  offset: 0,
  pageNumber: 0,
  total: null
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
