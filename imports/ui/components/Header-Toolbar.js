import React, { Component } from 'react'

import BoardSelector from './Board-Selector'
import UserPanel from './User-Panel'

import '../../styles/header-style.css'

// Header toolbar
export default class HeaderToolbar extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-title-part">
          <div className="app-title">SIMPLE TRELLO</div>
          <BoardSelector
            currentBoardIndex={this.props.currentBoardIndex}
          />
        </div>
        
        <UserPanel />
      </div>
    )
  }
}