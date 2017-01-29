import React, { Component } from 'react'
import Button from '../../../components/Button'

export default class GeneratePlaylistView extends Component {
  componentDidMount() {
    const {calledApi, generate: { offset, songList, total }} = this.props;
    calledApi(offset, songList, total);
  }

  componentDidUpdate() {
    const {calledApi, fetchFeatures, redirectToFeatures, GeneratePlaylist: { offset, songList, features, total }} = this.props;
    console.log('view', songList.length, total);
    if (songList.length < total) {
      calledApi(offset, songList, total);
    } else if (features.length < total) {
      fetchFeatures(songList);
    } else {
      redirectToFeatures();
    }
  }

  render() {
    const { redirectToFeatures, GeneratePlaylist: { total } } = this.props;
    return (
      <div className="home">
        <div className="home__container text--center">
          <h1 className="text--green">Fryin' up some corn dogs</h1>
          <img src='https://media.giphy.com/media/3oEjHGIMl0qrDHamqs/giphy.gif' alt='korn'/>
        </div>
      </div>
    )
  }
}
