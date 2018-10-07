import React, { Component } from 'react'

import '../../styles/board-selector.css'

export default class BoardSelector extends Component {
  render() {
    return (
      <div className="board-selector-container">
        <div className="icon">L</div>
        <div className="title">Project W</div>
        <div className="selector">--></div>
      </div>
    )
  }
}