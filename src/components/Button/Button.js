import React, { Component, PropTypes } from 'react';
import './Button.scss'

export default class Button extends React.Component {
  static propTypes = {
      className: PropTypes.string,
      onClick: PropTypes.func,
  };

  render() {
    const { onClick } = this.props;

    return (
      <button className="cd-button" onClick={onClick}>
      THIS IS A BUTTON
      </button>
    );
  }
}
