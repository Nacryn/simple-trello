import React, { Component } from 'react'

import BoardSelector from './Board-Selector'
import UserPanel from './User-Panel'

// Header toolbar
export default class HeaderToolbar extends Component {
  render() {
    return (
      <div className="container">
        <BoardSelector />
        <UserPanel />
      </div>
    )
  }
}