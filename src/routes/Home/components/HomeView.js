import React, { Component } from 'react'
import DuckImage from '../assets/Duck.jpg'
import Button from '../../../components/Button'
import './HomeView.scss'

export default class HomeView extends Component {
  authenticatedUser = () => {
    alert('yay');
  }

  render() {
    return (
      <div className="home">
        <div className="home__container text--center">
          <h1 className="text--green">Corndog Playlist Generator</h1>
          <h2 className="text--white">Generate the playlist of your life by customizing settings and all the junk! All you have to do is log in to your Spotify account.</h2>
          <Button
            onClick={this.authenticatedUser}
            className="cd-button--green"
            buttonName="Log in to Spotify"
          />
        </div>
      </div>
    )
  }
}
