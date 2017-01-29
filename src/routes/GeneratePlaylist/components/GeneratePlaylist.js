import React, { Component } from 'react'
import Button from '../../../components/Button'

export default class GeneratePlaylistView extends Component {

  componentDidMount() {
    console.log('props', this.props);
    const {generatePlaylist, fetch: { songList, features, minMax, FEATURES }, features: { allFeatures }} = this.props;
    generatePlaylist(allFeatures, songList, features, minMax, FEATURES);
  }

  componentDidUpdate() {
    const {redirectToSuccess, generate: { playlistTracks }} = this.props;
    if (playlistTracks.length > 0) {
      console.log('Success!');
      redirectToSuccess();
    }
  }

  render() {
    const { redirectToFeatures } = this.props;
    return (
      <div className="home">
        <div className="home__container text--center">
          <h1 className="text--green">Fryin' up some corn, dawgz</h1>
          <img src='https://media.giphy.com/media/3oEjHGIMl0qrDHamqs/giphy.gif' alt='korn' width="300" height="300"/>
        </div>
      </div>
    )
  }
}
