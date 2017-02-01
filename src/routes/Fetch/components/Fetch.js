import React, { Component } from 'react'
import Button from '../../../components/Button'
import './Fetch.scss'

export default class FetchView extends Component {
  componentDidMount() {
    const {fetchTracks, fetch: { offset, songList, total }} = this.props;
    fetchTracks(offset, songList, total);
  }

  componentDidUpdate() {
    const {fetchTracks, fetchFeatures, redirectToFeatures, extractMinMax, fetch: { FEATURES, offset, songList, features, total, minMax }} = this.props;
    if (songList.length < total) {
      fetchTracks(offset, songList, total);
    } else if (features.length < total) {
      fetchFeatures(songList, features);
    } else if (Object.keys(minMax).length < FEATURES.length) {
      extractMinMax(songList, features);
    } else {
      redirectToFeatures();
    }
  }

  render() {
    const { redirectToFeatures, fetch: { total } } = this.props;
    return (
      <div className="fetch">
        <div className="fetch__container text--center">
          <h2 className="text--white">Hold up, we're gonna go do some math with your { total > 0 ? total : ''}  saved tracks...</h2>
        </div>
      </div>
    )
  }
}
