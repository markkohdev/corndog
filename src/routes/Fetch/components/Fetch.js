import React, { Component } from 'react'
import Button from '../../../components/Button'
import './Fetch.scss'

export default class FetchView extends Component {
  componentDidMount() {
    const {calledApi, fetch: { offset, songList, total }} = this.props;
    calledApi(offset, songList, total);
  }

  componentDidUpdate() {
    const {calledApi, fetchFeatures, redirectToFeatures, extractMinMax, fetch: { FEATURES, offset, songList, features, total, minMax }} = this.props;
    if (songList.length < total) {
      console.log('Fetching songs...');
      calledApi(offset, songList, total);
    } else if (features.length < total) {
      console.log('Fetching features...');
      fetchFeatures(songList, features);
    } else if (Object.keys(minMax).length < FEATURES.length) {
      console.log('Extracting features...');
      extractMinMax(songList, features);
    } else {
      console.log('Fetching complete: ', this.props.fetch);
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
