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

const spotify = new SpotifyWebApi();
const access_token = cookie.load('spotify_access_token');
spotify.setAccessToken(access_token);

export function calledApi(offset, songList = [], total) {
  return (dispatch, getState) => {
    // Get the first set of tracks so we can get the total
    spotify.getMySavedTracks({offset}).then(function(data) {
      // Update the total number of tracks (for pagination purposes)
      const total = data.total;
      const tracks = data.items.map((item) => item.track);
      console.log(tracks);
      dispatch({
        type: FETCH_API_CALLED,
        payload: {
          tracks,
          total
        }
      });
    });
  }
}

export function fetchFeatures(tracks) {
  return (dispatch, getState) => {
    return new Promise((listCompleteResolve) => {
      let features = [];
      let promises = [];
      const limit = 100;
      let current = 0;

      // Iterate through the tracks array and create slices of size 100 to query the API with
      while(current < tracks.length) {
        let upper = current + limit <= tracks.length ? current + limit : tracks.length ;
        const subarray = tracks.slice(current, upper);
        let ids = subarray.map(function(track) { return track.id });

        let featuresPromise = spotify.getAudioFeaturesForTracks(ids);
        promises.push(featuresPromise);

        current += upper;
      }

      Promise.all(promises).then(function(results) {
        const features = [];

        results.forEach(function(result) {
          // console.log(result);
          result.audio_features.forEach(function(feature) {
            features.push(feature);
          });
        });

        dispatch({
          type: FETCH_FEATURES_CALLED,
          payload: {
            features
          }
        });
      }).catch(function(err) {
        console.log('Aw shit: ', err);
      })
    })
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
    console.log(newOffset, newSonglist);
    return {
      ...state,
      songList: newSonglist,
      offset: newOffset,
      total
    }
  },
  [FETCH_FEATURES_CALLED] : (state, action) => {
    const { features } = action.payload;
    console.log('action total', state.total);
    return {
      ...state,
      features
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  songList: [],
  offset: 0,
  total: 0,
  features: []
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
