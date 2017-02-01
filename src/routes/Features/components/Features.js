import React, { Component } from 'react'
import Button from '../../../components/Button'
import Slider, { Range } from 'rc-slider';
import './Features.scss';

export default class FeatureView extends Component {
  handleSliderChange = (newValue, feature) => {
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
    const { goToIndex, features: { allFeatures, currentFeatureIndex}, fetch: { minMax }} = this.props;
    const allFeatureKeys = Object.keys(allFeatures);
    const btnName = currentFeatureIndex < allFeatureKeys.length - 1 ? "next" : "submit";
    const submitClass = (currentFeatureIndex >= allFeatureKeys.length - 1) ? 'cd-button--filled' : "";
    return (
      <div className="featuresView">
        <div className="featuresView__sidebar">
          {allFeatureKeys.map((feature, index) => {
            const featureValue = allFeatures[feature];
            const currentFeature = allFeatureKeys[currentFeatureIndex];
            const activeClass = currentFeature === feature ? 'features-nav--active' : "";
            return (
              <div className={`features-nav ${activeClass}`} key={index} onClick={()=> {goToIndex(index)}}>
                <span>{index+1}.</span> {feature}
              </div>
            )
          })
          }
        </div>
        <div className="allFeatures">
          <div className="allFeatures__contain">
          {
            allFeatureKeys.map((feature, index) => {
              const featureValue = allFeatures[feature].value;
              const featureDescription = allFeatures[feature].description;
              const currentFeature = allFeatureKeys[currentFeatureIndex];
              const isActive = currentFeature === feature;
              const valueDiff = isActive && featureValue !== 50 ? (Math.abs(Math.ceil(50 - featureValue))/50*0.3) + 1 : 1;
              const activeClass = isActive ? 'features--active' : "";
              const featureMinMax = minMax[feature];
              const minUri = featureMinMax.minTrack.uri;
              const maxUri = featureMinMax.maxTrack.uri;
              const minValue = featureMinMax.min;
              const maxValue = featureMinMax.max;
              return (
                <div className={`features ${activeClass}`} key={index}>
                  <div className="features__container text--center">
                    <h1 className="text--green">{feature}</h1>
                    <p><em>[.noun]</em> {featureDescription}</p>
                    <div className="slider-container">
                      <div className="flexbox flexbox--vcenter flexbox--space-between">
                        <div className="slider__minMax" style={isActive && featureValue < 50 ? {transform: `scale(${valueDiff})`, opacity: 1} : {}}>
                          <h4>Least</h4>
                          <iframe src={`https://embed.spotify.com/?uri=${minUri}`} width="250" height="80" frameBorder="0" allowTransparency="true"></iframe>
                          {minValue}
                        </div>
                        <div className="slider__minMax" style={isActive && featureValue > 50 ? {transform: `scale(${valueDiff})`, opacity: 1} : {}}>
                          <h4>Most</h4>
                          <iframe src={`https://embed.spotify.com/?uri=${maxUri}`} width="250" height="80" frameBorder="0" allowTransparency="true"></iframe>
                          {maxValue}
                        </div>
                      </div>
                      <Slider
                        defaultValue={50}
                        marks={{0: "least", 100: "most"}}
                        min={0}
                        value={featureValue}
                        onChange={(newValue) => this.handleSliderChange(newValue, feature)}
                      />
                      Current: {featureValue}, Median: {featureMinMax.median}
                    </div>
                  </div>
                </div>
              )
            })
          }
            <div className="flexbox">
              { currentFeatureIndex > 0 ? <Button className="cd-button cd-button--green" buttonName="previous" onClick={this.goToPrevFeature}/> : null }
              <Button className={`cd-button cd-button--green ${submitClass}`} buttonName={btnName} onClick={this.goToNextFeature}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
