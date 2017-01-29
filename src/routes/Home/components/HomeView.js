import React, { Component } from 'react'
import Button from '../../../components/Button'
import './HomeView.scss'

export default class HomeView extends Component {
  authenticatedUser = () => {
    window.location = '/login';
  }

  render() {
    return (
      <div className="home">
        <div className="home__container text--center">
          <div className="home__title">
            <h1 className="text--green">Corndog Playlist Generator</h1>
            <h3 className="text--white">Generate the playlist of your life by customizing settings and all the junk! All you have to do is log in to your Spotify account.</h3>
          </div>
          <Button
            onClick={this.authenticatedUser}
            className="cd-button--filled"
            buttonName="Log in to Spotify"
          />
        </div>
      </div>
    )
  }
}
