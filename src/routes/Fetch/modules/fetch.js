import { browserHistory } from 'react-router'
import cookie from 'react-cookie';
const SpotifyWebApi = require('spotify-web-api-js');

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_API_CALLED = 'FETCH_API_CALLED'
export const FETCH_FEATURES_CALLED = 'FETCH_FEATURES_CALLED'
export const FETCH_MIN_MAX = 'FETCH_MIN_MAX'
export const REDIRECT_TO_FEATURES = 'REDIRECT_TO_FEATURES'

export const FEATURES = [
  'acousticness',
  'danceability',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence'
];

// Setup the Spotify client
const spotify = new SpotifyWebApi();
const access_token = cookie.load('spotify_access_token');
spotify.setAccessToken(access_token);

// ------------------------------------
// Actions
// ------------------------------------

export function getFeaturesForTrack(track) {
  const feature_values = [];
  FEATURES.forEach((feature_key) => {
    const feature_value = track[feature_key];
    feature_values.push(feature_value);
  });
  return feature_values;
}


export function calledApi(offset, songList = [], total) {
  return (dispatch, getState) => {
    // Get the first set of tracks so we can get the total
    spotify.getMySavedTracks({offset}).then(function(data) {
      // Update the total number of tracks (for pagination purposes)
      const total = data.total;
      const tracks = data.items.map((item) => item.track);
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

export function fetchFeatures(tracks, features) {
  return (dispatch, getState) => {
    let newFeatures = [];
    const limit = 100;
    const current = features.length;

    let upper = current + limit <= tracks.length ? current + limit : tracks.length;
    const subarray = tracks.slice(current, upper);
    let ids = subarray.map(function(track) { return track.id });

    spotify.getAudioFeaturesForTracks(ids).then(function(data) {
      data.audio_features.forEach(function(track_features) {
        // Extract feature arrays
        const extractedFeatures = getFeaturesForTrack(track_features);
        newFeatures.push(extractedFeatures);
      });

      dispatch({
        type: FETCH_FEATURES_CALLED,
        payload: {
          newFeatures
        }
      });
    }).catch(function(err) {
      console.log('Audio feature fetch failed :( ', err);
    });
  }
}

export function extractMinMax(tracks, features) {
  const featureMinMaxMap = {};

  for(let i=0; i < FEATURES.length; i++){
    const feature = FEATURES[i];
    // Initialize the min max to the first value for this feature
    let min = features[0][i];
    let max = features[0][i];
    let minTrack = tracks[0];
    let maxTrack = tracks[0];

    // Iterate through each feature row and record the index of the min and max
    for(let j=0; j < features.length; j++) {
      const featureRow = features[j];

      // Get the current feature value from the row
      const featureValue = featureRow[i];

      // Compare and update min and max accordingly
      if (featureValue < min) {
        min = featureValue;
        minTrack = tracks[j];
        // console.log('Updating min ' + feature, minTrack.name, min)
      }
      if (featureValue > max) {
        max = featureValue;
        maxTrack = tracks[j];
        // console.log('Updating max ' + feature, maxTrack.name, max)
      }
    }

    // Build our MinMax object
    const minMaxObject = {
      feature: feature,
      min: min,
      minTrack: minTrack,
      max: max,
      maxTrack: maxTrack
    };

    // Add the object to the minmax map
    featureMinMaxMap[feature] = minMaxObject;
  }

  // Alright, we've found the max and min for each jawn, scale the vectors
  // for (let i=0; i<FEATURES.length; i++) {
  //   const featureKey = FEATURES[i];
  //   const featureMin = featureMinMaxMap[featureKey].min
  //   const featureMax = featureMinMaxMap[featureKey].max
  //   const scaleRange = featureMax - featureMin;

  //   for (let j=0; j<features.length; j++) {
  //     let scaledFeatureValue = features[j][i];
  //     scaledFeatureValue -= featureMin;
  //     scaledFeatureValue = scaledFeatureValue/scaleRange;
  //     features[j][i] = scaledFeatureValue;
  //   }
  // }

  // Return the map
  return {
    type: FETCH_MIN_MAX,
    payload: {
      featureMinMaxMap
    }
  }
}

export function redirectToFeatures() {
  browserHistory.push('/features')

  return {
    type: REDIRECT_TO_FEATURES
  }
}

export const actions = {
  calledApi,
  fetchFeatures,
  redirectToFeatures,
  extractMinMax
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
  },
  [FETCH_FEATURES_CALLED] : (state, action) => {
    let { features } = state;
    const { newFeatures } = action.payload;
    const newFeaturesState = features.slice(0).concat(newFeatures);
    return {
      ...state,
      features: newFeaturesState
    }
  },
  [FETCH_MIN_MAX] : (state, action) => {
    const { featureMinMaxMap } = action.payload;
    return {
      ...state,
      minMax: featureMinMaxMap
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
  features: [],
  minMax: {},
  FEATURES
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
