import React, { Component } from 'react'

import HeaderToolbar from './Header-Toolbar'

// The whole App
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <HeaderToolbar />
        <div>
          Ici on va mettre le milieu.
        </div>
      </div>
    )
  }
}