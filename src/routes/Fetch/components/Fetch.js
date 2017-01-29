import React, { Component } from 'react'
import Button from '../../../components/Button'

export default class FetchView extends Component {
  componentDidMount() {
    const {calledApi, fetch: { offset, songList, total }} = this.props;
    calledApi(offset, songList, total);
  }

  componentDidUpdate() {
    const {calledApi, fetchFeatures, fetch: { offset, songList, features, total }} = this.props;
    console.log('view', songList.length, total);
    if (songList.length < total) {
      calledApi(offset, songList, total);
    } else if (features.length < total) {
      fetchFeatures(songList);
    }
  }

  render() {
    const { redirectToFeatures } = this.props;
    return (
      <div className="home">
        <div className="home__container text--center">
          <h1 className="text--green">Corndog Playlist Generator</h1>
          <h2 className="text--white">Generate the playlist of your life by customizing settings and all the junk! All you have to do is log in to your Spotify account.</h2>
          <Button
            onClick={redirectToFeatures}
            className="cd-button--green"
            buttonName="Log in to Spotify"
          />
        </div>
      </div>
    )
  }
}
