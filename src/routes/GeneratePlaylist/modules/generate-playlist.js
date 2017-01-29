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
    const weightedPreferenceValue = allFeatures[featureKey].value / 100.0;

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


  return {
    type: GENERATE_SIMILARITIES,
    payload: {
      similarities
    }
  }
}

// Compare two similarityobjects
function compareTrack(a, b) {
  if (a.cosine < b.cosine)
    return -1;
  else if (b.cosine > a.cosine)
    return 1;
  else
    return 0;
}

export function generatePlaylist(similarities) {
  return (dispatch, getState) => {

    // Sort tracks by similarity
    similarities.sort(compareTrack);


    // Get the first 30 tracks
    const first30 = similarities.slice(0,30);
    const first30Ids = first30.map((simObj) => simObj.track.uri);

    // Setup the Spotify client
    const spotify = new SpotifyWebApi();
    const access_token = cookie.load('spotify_access_token');
    spotify.setAccessToken(access_token);

    spotify.getMe().then(function(me) {
      console.log(me);

      const userId = me.id;

      spotify.createPlaylist(userId, {name: 'Corndog'}).then(function(playlistInfo) {
        console.log(playlistInfo);

        const playlistId = playlistInfo.id;
        const playlistUri = playlistInfo.uri;

        spotify.addTracksToPlaylist(userId, playlistId, first30Ids).then(function(response) {
          console.log(response);

          dispatch({
            type: GENERATE_PLAYLIST,
            payload: {
              playlistUri: playlistUri
            }
          })
        }).catch(function(err) {
          console.log('Couldn\'t add tracks', err)
        })

      }).catch(function(err) {
        console.log('Couldn\'t create playlist', err)
      })

    }).catch(function(err) {
      console.log('Couldn\'t get me: ', err)
    });
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
    const { playlistUri } = action.payload;
    return {
      ...state,
      playlistUri
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  playlistUri: null,
  similarities: []
}
export default function fetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
