import cookie from 'react-cookie';
const SpotifyWebApi = require('spotify-web-api-js');

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const FETCH_API_CALLED = 'FETCH_API_CALLED'
export const FETCH_FEATURES_CALLED = 'FETCH_FEATURES_CALLED'

// ------------------------------------
// Actions
// ------------------------------------

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

      const tracks = [];
      let total = 1;
      // Get the first set of tracks so we can get the total\
      spotify.getMySavedTracks({offset: tracks.length}).then(function(data) {
        // Update the total number of tracks (for pagination purposes)
        total = data.total;
        data.items.forEach(function(item) {
          tracks.push(item.track);
        });

        fetchFeatures(spotify, tracks).then(function(features) {
          dispatch({
            type: FETCH_API_CALLED,
            payload: tracks
          })
          listCompleteResolve()
        }, function(err) {
          console.log(err)
        })
      }, function(err) {
        console.log(err);
        listCompleteResolve()
      })
    })
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
  [FETCH_API_CALLED] : (state, action) => { return {...state, songList:action.payload}},
  [FETCH_FEATURES_CALLED] : (state, action) => { return {...state, songFeatures:action.payload}}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  songFeatures: [],
  songList: []
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
