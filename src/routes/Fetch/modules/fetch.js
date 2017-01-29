import cookie from 'react-cookie';
const SpotifyWebApi = require('spotify-web-api-js');

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const FETCH_API_CALLED = 'FETCH_API_CALLED'
export const FETCH = 'FETCH_MATRIX_STORED'

// ------------------------------------
// Actions
// ------------------------------------

// THIS IS WRONG I THINK
// function getAllTracks(spotify, tracks) {
//   // Get the first set of tracks so we can get the total\
//   return spotify.getMySavedTracks({offset: tracks.length}).then(function(data) {
//     // Update the total number of tracks (for pagination purposes)
//     total = data.total;
//     data.items.forEach(function(item) {
//       tracks.push(item.track);
//     });

//     if (tracks.length < total) {
//       return Promise.all([data, getAllTracks(spotify, tracks)]);
//     }
//     else {
//       return tracks
//     }
//   }, function(err) {
//     consol.log(err);
//   })
// }

export function calledApi(){
  return (dispatch, getState) => {
    return new Promise((listCompleteResolve) => {
      // Initialize the spotify API and set our access token
      const spotify = new SpotifyWebApi();
      const access_token = cookie.load('spotify_access_token');
      spotify.setAccessToken(access_token);

      // Get the first set of tracks so we can get the total\
      spotify.getMySavedTracks({offset: tracks.length}).then(function(data) {
        // Update the total number of tracks (for pagination purposes)
        total = data.total;
        data.items.forEach(function(item) {
          tracks.push(item.track);
        });

        dispatch({
          type: FETCH_API_CALLED,
          payload: tracks
        })
        listCompleteResolve()
      }, function(err) {
        console.log(err);
        listCompleteResolve()
      })
    })
  }
}

export function increment (value = 1) {
  // Hit SP API

  // Return
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

    export const doubleAsync = () => {
      return (dispatch, getState) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            dispatch({
              type    : COUNTER_DOUBLE_ASYNC,
              payload : getState().fetch
            })
            resolve()
          }, 200)
        })
      }
    }

    export const actions = {
      increment,
      doubleAsync,
      calledApi
    }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [FETCH_API_CALLED] : (state, action) => { return {...state, songList:action.payload}}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  somethingElse: [],
  songList: ['OMG']
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
