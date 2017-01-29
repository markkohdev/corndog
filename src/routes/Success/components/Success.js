import React, { Component } from 'react'
import Button from '../../../components/Button'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Success.scss';

export default class FeatureView extends Component {
  handleSliderChange = (newValue, success) => {
    console.log(newValue, success);
    const { successSliderChanged } = this.props;
    successSliderChanged(newValue, success);
  }

  goToNextFeature = () => {
    const { navigatedToNextFeature, generatePlaylists, success: {allSuccess, currentFeatureIndex} } = this.props;
    if (currentFeatureIndex < Object.keys(allSuccess).length - 1) {
      navigatedToNextFeature();
    } else {
      generatePlaylists();
    }
  }

  goToPrevFeature = () => {
    const { navigatedToPrevFeature } = this.props;
    navigatedToPrevFeature();
  }

  render() {
    const { success: { allSuccess, currentFeatureIndex}} = this.props;
    const allFeatureKeys = Object.keys(allSuccess);
    const btnName = currentFeatureIndex < allFeatureKeys.length - 1 ? "next" : "submit";
    console.log(this.props);
    return (
      <div className="allSuccess">
        <iframe src="https://embed.spotify.com/?uri=spotify:user:jztaddwater:playlist:2yEH4RJuhGJK56s6zVlwhQ" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
      </div>
    )
  }
}
