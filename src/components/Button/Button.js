import React, { Component, PropTypes } from 'react';
import './Button.scss'

export default class Button extends React.Component {
  static propTypes = {
      className: PropTypes.string,
      onClick: PropTypes.func,
  };

  render() {
    const { onClick, buttonName } = this.props;

    return (
      <button className="cd-button" onClick={onClick}>
        {buttonName}
      </button>
    );
  }
}
