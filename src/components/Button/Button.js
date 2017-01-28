import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Button.scss'

export class Button extends React.Component {

  render() {
    const { onClick } = this.props;

    return (
      <button className="cd-button" onClick={onClick}>
      THIS IS A BUTTON
      </button>
    )
  }
}

export default Button
