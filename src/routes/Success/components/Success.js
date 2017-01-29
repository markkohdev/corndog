import React, { Component } from 'react'
import Button from '../../../components/Button'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Success.scss';

export default class FeatureView extends Component {
  render() {
    const { success: { allSuccess, currentFeatureIndex}} = this.props;
    const allFeatureKeys = Object.keys(allSuccess);
    const btnName = currentFeatureIndex < allFeatureKeys.length - 1 ? "next" : "submit";
    return (
      <div className="allSuccess">
        <div className="allSuccess__container">
          <div className="allSuccess__title">
            <h2 className="text--green">Welcome to your shiny new playlist!</h2>
            <p>You can also check it out in your Spotify app. Enjoy!</p>
          </div>
          <div>
            <div className="allSuccess__playlist">
              <iframe src="https://embed.spotify.com/?uri=spotify:user:jztaddwater:playlist:2yEH4RJuhGJK56s6zVlwhQ" width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
            </div>
            <Button className="cd-button--filled" buttonName="Make another playlist" onClick={() => {}}/>
          </div>
        </div>
      </div>
    )
  }
}
