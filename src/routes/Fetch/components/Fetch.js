import React, { Component } from 'react'
import Button from '../../../components/Button'

export default class FetchView extends Component {
  componentDidMount() {
    const {calledApi} = this.props;
    calledApi();
  }

  render() {
    return (
      <div className="home">
        <div className="home__container text--center">
          <h1 className="text--green">Corndog Playlist Generator</h1>
          <h2 className="text--white">Generate the playlist of your life by customizing settings and all the junk! All you have to do is log in to your Spotify account.</h2>
        </div>
      </div>
    )
  }
}
