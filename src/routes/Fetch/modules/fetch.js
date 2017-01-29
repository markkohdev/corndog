import { browserHistory } from 'react-router'
import cookie from 'react-cookie';
const SpotifyWebApi = require('spotify-web-api-js');

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_API_CALLED = 'FETCH_API_CALLED'
export const FETCH_FEATURES_CALLED = 'FETCH_FEATURES_CALLED'
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
      console.log(data);
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

function fetchFeatures(spotify, tracks) {
  console.log(tracks);
  return new Promise((listCompleteResolve) => {
    let features = [];
    let promises = [];
    const limit = 100;
    let current = 0;

    // Iterate through the tracks array and create slices of size 100 to query the API with
    while(current < tracks.length) {
      let upper = current + limit < tracks.length ? current + limit : tracks.length ;
      const subarray = tracks.slice(current, upper);
      let ids = subarray.map(function(track) { return track.id });
      console.log(ids);

      let featuresPromise = spotify.getAudioFeaturesForTracks(ids);
      promises.push(featuresPromise);

      current += upper;
    }

    Promise.all(promises).then(function(results) {
      results.forEach(function(result) {
        console.log(result);
      })
    }).catch(function(err) {
      console.log('Aw shit: ', err);
    })
  })
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
    const newOffset = offset += 20;
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
  total: null
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
