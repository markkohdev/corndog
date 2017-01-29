import React, { Component } from 'react'
import Button from '../../../components/Button'

export default class GeneratePlaylistView extends Component {

  render() {
    const { redirectToFeatures, GeneratePlaylist: { total } } = this.props;
    return (
      <div className="home">
        <div className="home__container text--center">
          <h1 className="text--green">Fryin' up some corn, dawgz</h1>
          <img src='https://media.giphy.com/media/3oEjHGIMl0qrDHamqs/giphy.gif' alt='korn'/>
        </div>
      </div>
    )
  }
}
