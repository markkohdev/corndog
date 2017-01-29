import React, { Component } from 'react'
import Button from '../../../components/Button'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Features.scss';

export default class FeatureView extends Component {
  handleSliderChange = (newValue, feature) => {
    console.log(newValue, feature);
    const { featureSliderChanged } = this.props;
    featureSliderChanged(newValue, feature);
  }

  goToNextFeature = () => {
    const { navigatedToNextFeature, generatePlaylists, features: {allFeatures, currentFeatureIndex} } = this.props;
    if (currentFeatureIndex < Object.keys(allFeatures).length - 1) {
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
    const { features: { allFeatures, currentFeatureIndex}, fetch: { minMax }} = this.props;
    const allFeatureKeys = Object.keys(allFeatures);
    const btnName = currentFeatureIndex < allFeatureKeys.length - 1 ? "next" : "submit";
    console.log(this.props);
    return (
      <div className="allFeatures">
      {
        allFeatureKeys.map((feature, index) => {
          const featureValue = allFeatures[feature];
          const currentFeature = allFeatureKeys[currentFeatureIndex];
          console.log(currentFeatureIndex,currentFeature, feature);
          const activeClass = currentFeature === feature ? 'features--active' : "";
          const minUri = minMax[feature].minTrack.uri;
          const maxUri = minMax[feature].maxTrack.uri;
          return (
            <div className={`features ${activeClass}`} key={index}>
              <div className="features__container text--center">
                <h1 className="text--green">{feature}</h1>
                Least {feature}
                <iframe src={`https://embed.spotify.com/?uri=${minUri}`} width="250" height="80" frameborder="0" allowtransparency="true"></iframe>
                Most {feature}
                <iframe src={`https://embed.spotify.com/?uri=${maxUri}`} width="250" height="80" frameborder="0" allowtransparency="true"></iframe>
                <Slider
                  defaultValue={50}
                  value={featureValue}
                  onChange={(newValue) => this.handleSliderChange(newValue, feature)}
                />
                end
              </div>
            </div>
          )
        })
      }
      { currentFeatureIndex > 0 ? <Button className="cd-button cd-button--green" buttonName="previous" onClick={this.goToPrevFeature}/> : null }
      <Button className="cd-button cd-button--green" buttonName={btnName} onClick={this.goToNextFeature}/>
      </div>
    )
  }
}
