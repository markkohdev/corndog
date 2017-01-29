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
    const { navigatedToNextFeature } = this.props;
    navigatedToNextFeature();
  }
  render() {
    const { features: { allFeatures, currentFeature}} = this.props;
    console.log(this.props);
    console.log(allFeatures);
    return (
      <div className="allFeatures">
      { 
        allFeatures.map((feature, index) => {
          const featureValue = allFeatures[feature];
          const currentValue = currentFeature.value;
          const activeClass = currentFeature.type === feature ? 'features--active' : "";
          return (
            <div className={`features ${activeClass}`} key={index}>
              <div className="features__container text--center">
                <h1 className="text--green">{feature}</h1>
                <Slider
                  defaultValue={50}
                  value={currentValue}
                  onChange={(newValue) => this.handleSliderChange(newValue, feature)}
                />
              </div>
            </div>
          )
        })
      }
      <Button className="cd-button cd-button--green" buttonName="next" onClick={this.goToNextFeature}/>
      </div>
    )
  }
}
