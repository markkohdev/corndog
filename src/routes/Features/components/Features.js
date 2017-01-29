import React, { Component } from 'react'
import Button from '../../../components/Button'
import Slider, { Range } from 'rc-slider';
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
    const { goToIndex, features: { allFeatures, currentFeatureIndex}, fetch: { minMax }} = this.props;
    const allFeatureKeys = Object.keys(allFeatures);
    const btnName = currentFeatureIndex < allFeatureKeys.length - 1 ? "next" : "submit";
    console.log(this.props);
    const submitClass = (currentFeatureIndex >= allFeatureKeys.length - 1) ? 'cd-button--filled' : "";
    return (
      <div className="featuresView">
        <div className="featuresView__sidebar">
          {allFeatureKeys.map((feature, index) => {
            const featureValue = allFeatures[feature];
            const currentFeature = allFeatureKeys[currentFeatureIndex];
            console.log(currentFeatureIndex,currentFeature, feature);
            const activeClass = currentFeature === feature ? 'features-nav--active' : "";
            const minUri = minMax[feature].minTrack.uri;
            const maxUri = minMax[feature].maxTrack.uri;
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
                    <p>Choose how much mustard you want on your corndog</p>
                    <div className="slider-container">
                      <div className="flexbox flexbox--vcenter flexbox--space-between">
                        <div>
                          <h4>Least</h4>
                          <iframe src={`https://embed.spotify.com/?uri=${minUri}`} width="250" height="80" frameBorder="0" allowTransparency="true"></iframe>
                        </div>
                        <div>
                          <h4>Most</h4>
                          <iframe src={`https://embed.spotify.com/?uri=${maxUri}`} width="250" height="80" frameBorder="0" allowTransparency="true"></iframe>
                        </div>
                      </div>
                      <Slider
                        defaultValue={50}
                        marks={{0: "least", 100: "most"}}
                        value={featureValue}
                        onChange={(newValue) => this.handleSliderChange(newValue, feature)}
                      />
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
